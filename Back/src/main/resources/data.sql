-- Pour effacer les anciennes données au besoin
-- TRUNCATE airline_company RESTART IDENTITY CASCADE;

ALTER TABLE airline_company DROP CONSTRAINT IF EXISTS uq_airline_company_name;
ALTER TABLE airline_company ADD CONSTRAINT uq_airline_company_name UNIQUE (name);
ALTER TABLE city DROP CONSTRAINT IF EXISTS uq_city_name;
ALTER TABLE city ADD CONSTRAINT uq_city_name UNIQUE (name);


INSERT INTO airline_company (name) VALUES ('Air France') ON CONFLICT (name) DO NOTHING;
INSERT INTO airline_company (name) VALUES ('Lufthansa') ON CONFLICT  (name)  DO NOTHING;
INSERT INTO airline_company (name) VALUES ('Transavia') ON CONFLICT (name)  DO NOTHING;
INSERT INTO airline_company (name) VALUES ('SwissAir') ON CONFLICT (name)  DO NOTHING;

INSERT INTO city (name, country) VALUES ('paris', 'france') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Prague', 'république tchèque') ON CONFLICT  (name)  DO NOTHING;
INSERT INTO city (name, country) VALUES ('barcelone', 'espagne') ON CONFLICT (name)  DO NOTHING;
INSERT INTO city (name, country) VALUES ('rome', 'italie') ON CONFLICT (name)  DO NOTHING;
INSERT INTO city (name, country) VALUES ('Londres', 'Royaume-Uni') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Berlin', 'Allemagne') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Lisbonne', 'Portugal') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Amsterdam', 'Pays-Bas') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Athènes', 'Grèce') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Vienne', 'Autriche') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Dublin', 'Irlande') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Bruxelles', 'Belgique') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Stockholm', 'Suède') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Oslo', 'Norvège') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('New York', 'États-Unis') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Montréal', 'Canada') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Tokyo', 'Japon') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Sydney', 'Australie') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Le Caire', 'Égypte') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Marrakech', 'Maroc') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Rio de Janeiro', 'Brésil') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Buenos Aires', 'Argentine') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Bangkok', 'Thaïlande') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Singapour', 'Singapour') ON CONFLICT (name) DO NOTHING;