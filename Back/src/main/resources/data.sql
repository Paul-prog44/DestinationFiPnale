-- Pour effacer les anciennes données au besoin
-- TRUNCATE airline_company RESTART IDENTITY CASCADE;
-- TRUNCATE TABLE flight RESTART IDENTITY CASCADE;
-- TRUNCATE TABLE flight RESTART IDENTITY CASCADE;


ALTER TABLE airline_company DROP CONSTRAINT IF EXISTS uq_airline_company_name;
ALTER TABLE airline_company ADD CONSTRAINT uq_airline_company_name UNIQUE (name);


INSERT INTO airline_company (name) VALUES ('Air France') ON CONFLICT (name) DO NOTHING;
INSERT INTO airline_company (name) VALUES ('Lufthansa') ON CONFLICT  (name)  DO NOTHING;
INSERT INTO airline_company (name) VALUES ('Transavia') ON CONFLICT (name)  DO NOTHING;
INSERT INTO airline_company (name) VALUES ('SwissAir') ON CONFLICT (name)  DO NOTHING;


ALTER TABLE city DROP CONSTRAINT IF EXISTS uq_city_name;
ALTER TABLE city ADD CONSTRAINT uq_city_name UNIQUE (name);

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

ALTER TABLE flight DROP CONSTRAINT IF EXISTS uq_flight_unique_route;
ALTER TABLE flight ADD CONSTRAINT uq_flight_unique_route UNIQUE (company_id, dep_city_id, arr_city_id, dept_time);


INSERT INTO flight (company_id, dep_city_id, arr_city_id, dept_time, arr_time, price) VALUES 
((SELECT id FROM airline_company WHERE name = 'Air France'), (SELECT id FROM city WHERE name = 'paris'), (SELECT id FROM city WHERE name = 'New York'), '2026-06-01 08:00:00', '2026-06-01 16:30:00', 550.00),
((SELECT id FROM airline_company WHERE name = 'Air France'), (SELECT id FROM city WHERE name = 'paris'), (SELECT id FROM city WHERE name = 'rome'), '2026-06-01 10:15:00', '2026-06-01 12:20:00', 89.99),
((SELECT id FROM airline_company WHERE name = 'Air France'), (SELECT id FROM city WHERE name = 'paris'), (SELECT id FROM city WHERE name = 'Montréal'), '2026-06-02 13:00:00', '2026-06-02 21:15:00', 620.50),
((SELECT id FROM airline_company WHERE name = 'Air France'), (SELECT id FROM city WHERE name = 'Marrakech'), (SELECT id FROM city WHERE name = 'paris'), '2026-06-03 18:00:00', '2026-06-03 21:15:00', 120.00),
((SELECT id FROM airline_company WHERE name = 'Air France'), (SELECT id FROM city WHERE name = 'Londres'), (SELECT id FROM city WHERE name = 'paris'), '2026-06-04 07:00:00', '2026-06-04 08:15:00', 65.00),
((SELECT id FROM airline_company WHERE name = 'Air France'), (SELECT id FROM city WHERE name = 'paris'), (SELECT id FROM city WHERE name = 'Tokyo'), '2026-06-05 23:20:00', '2026-06-06 18:45:00', 980.00);

INSERT INTO flight (company_id, dep_city_id, arr_city_id, dept_time, arr_time, price) VALUES 
((SELECT id FROM airline_company WHERE name = 'Lufthansa'), (SELECT id FROM city WHERE name = 'Berlin'), (SELECT id FROM city WHERE name = 'paris'), '2026-06-01 09:00:00', '2026-06-01 10:45:00', 115.00),
((SELECT id FROM airline_company WHERE name = 'Lufthansa'), (SELECT id FROM city WHERE name = 'Berlin'), (SELECT id FROM city WHERE name = 'Prague'), '2026-06-02 14:30:00', '2026-06-02 15:35:00', 75.00),
((SELECT id FROM airline_company WHERE name = 'Lufthansa'), (SELECT id FROM city WHERE name = 'Vienne'), (SELECT id FROM city WHERE name = 'Berlin'), '2026-06-02 19:00:00', '2026-06-02 20:15:00', 95.00),
((SELECT id FROM airline_company WHERE name = 'Lufthansa'), (SELECT id FROM city WHERE name = 'Berlin'), (SELECT id FROM city WHERE name = 'Singapour'), '2026-06-03 21:55:00', '2026-06-04 16:15:00', 740.00),
((SELECT id FROM airline_company WHERE name = 'Lufthansa'), (SELECT id FROM city WHERE name = 'Le Caire'), (SELECT id FROM city WHERE name = 'Berlin'), '2026-06-04 02:10:00', '2026-06-04 06:40:00', 310.00);

INSERT INTO flight (company_id, dep_city_id, arr_city_id, dept_time, arr_time, price) VALUES 
((SELECT id FROM airline_company WHERE name = 'Transavia'), (SELECT id FROM city WHERE name = 'paris'), (SELECT id FROM city WHERE name = 'barcelone'), '2026-06-01 06:30:00', '2026-06-01 08:15:00', 39.99),
((SELECT id FROM airline_company WHERE name = 'Transavia'), (SELECT id FROM city WHERE name = 'barcelone'), (SELECT id FROM city WHERE name = 'Lisbonne'), '2026-06-02 11:00:00', '2026-06-02 12:55:00', 45.50),
((SELECT id FROM airline_company WHERE name = 'Transavia'), (SELECT id FROM city WHERE name = 'Amsterdam'), (SELECT id FROM city WHERE name = 'barcelone'), '2026-06-02 16:40:00', '2026-06-02 18:50:00', 59.00),
((SELECT id FROM airline_company WHERE name = 'Transavia'), (SELECT id FROM city WHERE name = 'paris'), (SELECT id FROM city WHERE name = 'Athènes'), '2026-06-03 07:15:00', '2026-06-03 11:30:00', 84.00),
((SELECT id FROM airline_company WHERE name = 'Transavia'), (SELECT id FROM city WHERE name = 'Dublin'), (SELECT id FROM city WHERE name = 'paris'), '2026-06-04 14:10:00', '2026-06-04 16:00:00', 49.99),
((SELECT id FROM airline_company WHERE name = 'Transavia'), (SELECT id FROM city WHERE name = 'Bruxelles'), (SELECT id FROM city WHERE name = 'Alicante'), '2026-06-05 12:00:00', '2026-06-05 14:20:00', 68.00);

INSERT INTO flight (company_id, dep_city_id, arr_city_id, dept_time, arr_time, price) VALUES 
((SELECT id FROM airline_company WHERE name = 'SwissAir'), (SELECT id FROM city WHERE name = 'paris'), (SELECT id FROM city WHERE name = 'Vienne'), '2026-06-01 09:15:00', '2026-06-01 11:10:00', 145.00),
((SELECT id FROM airline_company WHERE name = 'SwissAir'), (SELECT id FROM city WHERE name = 'Stockholm'), (SELECT id FROM city WHERE name = 'Oslo'), '2026-06-02 08:30:00', '2026-06-02 09:25:00', 105.00),
((SELECT id FROM airline_company WHERE name = 'SwissAir'), (SELECT id FROM city WHERE name = 'New York'), (SELECT id FROM city WHERE name = 'Buenos Aires'), '2026-06-03 22:00:00', '2026-06-04 09:30:00', 890.00),
((SELECT id FROM airline_company WHERE name = 'SwissAir'), (SELECT id FROM city WHERE name = 'Bangkok'), (SELECT id FROM city WHERE name = 'Sydney'), '2026-06-04 15:40:00', '2026-06-05 04:15:00', 610.00),
((SELECT id FROM airline_company WHERE name = 'SwissAir'), (SELECT id FROM city WHERE name = 'Rio de Janeiro'), (SELECT id FROM city WHERE name = 'paris'), '2026-06-05 20:30:00', '2026-06-06 11:15:00', 1120.00);