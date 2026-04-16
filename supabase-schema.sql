-- ============================================================
-- MORT & CÉLÈBRE — Schéma Supabase
-- À exécuter dans : Supabase → SQL Editor → New query
-- ============================================================

-- ── 1. PROFILS UTILISATEURS ─────────────────────────────────
-- Étend auth.users (géré par Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id            UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  pseudo        TEXT        NOT NULL UNIQUE,
  email         TEXT        NOT NULL,
  newsletter    BOOLEAN     NOT NULL DEFAULT true,   -- consentement newsletter
  team_id       UUID,                                -- clé étrangère ajoutée après
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 2. ÉQUIPES ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.teams (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT        NOT NULL,
  admin_id      UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  invite_code   TEXT        NOT NULL UNIQUE DEFAULT upper(substr(md5(random()::text), 1, 6)),
  locked        BOOLEAN     NOT NULL DEFAULT false,
  pred_limit    INT         NOT NULL DEFAULT 20,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Clé étrangère profiles → teams (après création de teams)
ALTER TABLE public.profiles
  ADD CONSTRAINT fk_profiles_team
  FOREIGN KEY (team_id) REFERENCES public.teams(id) ON DELETE SET NULL;

-- ── 3. PRÉDICTIONS ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.predictions (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  team_id       UUID        REFERENCES public.teams(id) ON DELETE SET NULL,
  year          INT         NOT NULL DEFAULT 2026,
  wikidata_id   TEXT        NOT NULL,               -- ex: "Q2599"
  celeb_name    TEXT        NOT NULL,
  celeb_domain  TEXT,
  celeb_nationality TEXT,
  celeb_age     INT,
  celeb_image   TEXT,
  celeb_wiki    TEXT,
  visibility    TEXT        NOT NULL DEFAULT 'public'
                            CHECK (visibility IN ('public','group','private')),
  status        TEXT        NOT NULL DEFAULT 'pending'
                            CHECK (status IN ('pending','correct','wrong')),
  confirmed_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, wikidata_id, year)               -- pas de doublon par an
);

-- ── 4. CÉLÉBRITÉS (cache Wikidata) ───────────────────────────
-- Évite de requêter Wikidata à chaque fois
CREATE TABLE IF NOT EXISTS public.celebrities (
  wikidata_id   TEXT        PRIMARY KEY,
  name          TEXT        NOT NULL,
  domain        TEXT,
  nationality   TEXT,
  birth_date    DATE,
  age           INT,
  image_url     TEXT,
  wiki_url      TEXT,
  is_alive      BOOLEAN     NOT NULL DEFAULT true,
  death_date    DATE,
  last_checked  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 5. INDEX ─────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_predictions_user      ON public.predictions(user_id);
CREATE INDEX IF NOT EXISTS idx_predictions_team      ON public.predictions(team_id);
CREATE INDEX IF NOT EXISTS idx_predictions_wikidata  ON public.predictions(wikidata_id);
CREATE INDEX IF NOT EXISTS idx_predictions_year      ON public.predictions(year);
CREATE INDEX IF NOT EXISTS idx_teams_invite          ON public.teams(invite_code);
CREATE INDEX IF NOT EXISTS idx_profiles_pseudo       ON public.profiles(pseudo);
CREATE INDEX IF NOT EXISTS idx_profiles_newsletter   ON public.profiles(newsletter) WHERE newsletter = true;

-- ── 6. ROW LEVEL SECURITY (RLS) ──────────────────────────────
-- Active la sécurité ligne par ligne sur toutes les tables

ALTER TABLE public.profiles    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.celebrities ENABLE ROW LEVEL SECURITY;

-- PROFILES : chaque utilisateur voit/modifie son propre profil
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Les pseudos sont visibles par tous (pour les classements)
CREATE POLICY "profiles_select_pseudo"
  ON public.profiles FOR SELECT
  USING (true);

-- TEAMS : visibles par tous les membres
CREATE POLICY "teams_select_member"
  ON public.teams FOR SELECT
  USING (
    id IN (
      SELECT team_id FROM public.profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "teams_insert_own"
  ON public.teams FOR INSERT
  WITH CHECK (admin_id = auth.uid());

CREATE POLICY "teams_update_admin"
  ON public.teams FOR UPDATE
  USING (admin_id = auth.uid());

-- PREDICTIONS : visibilité selon le champ visibility
CREATE POLICY "predictions_select_own"
  ON public.predictions FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "predictions_select_public"
  ON public.predictions FOR SELECT
  USING (visibility = 'public');

CREATE POLICY "predictions_select_group"
  ON public.predictions FOR SELECT
  USING (
    visibility = 'group'
    AND team_id IN (
      SELECT team_id FROM public.profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "predictions_insert_own"
  ON public.predictions FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "predictions_update_own"
  ON public.predictions FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "predictions_delete_own"
  ON public.predictions FOR DELETE
  USING (user_id = auth.uid());

-- CELEBRITIES : lecture publique, écriture via le client authentifié
CREATE POLICY "celebrities_select_all"
  ON public.celebrities FOR SELECT
  USING (true);

CREATE POLICY "celebrities_upsert_auth"
  ON public.celebrities FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "celebrities_update_auth"
  ON public.celebrities FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- ── 7. TRIGGER : profil auto à l'inscription ─────────────────
-- Crée automatiquement une ligne dans profiles quand un user s'inscrit

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, pseudo, email, newsletter)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'pseudo',
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'newsletter')::boolean, true)
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ── 8. TRIGGER : updated_at automatique ──────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

CREATE OR REPLACE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

-- ── 9. VUE : newsletter (usage futur Brevo/Mailchimp) ────────
-- Requête simple pour exporter les abonnés
CREATE OR REPLACE VIEW public.newsletter_subscribers AS
  SELECT pseudo, email, created_at
  FROM public.profiles
  WHERE newsletter = true
  ORDER BY created_at DESC;

-- ── 10. VUE : palmarès 2026 ───────────────────────────────────
CREATE OR REPLACE VIEW public.palmares_2026 AS
  SELECT
    p.user_id,
    pr.pseudo,
    COUNT(*) FILTER (WHERE p.status = 'correct') AS correct,
    COUNT(*) AS total,
    MAX(p.created_at) AS last_prediction
  FROM public.predictions p
  JOIN public.profiles pr ON pr.id = p.user_id
  WHERE p.year = 2026
  GROUP BY p.user_id, pr.pseudo
  ORDER BY correct DESC, total DESC;
