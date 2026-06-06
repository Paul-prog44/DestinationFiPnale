-- Pour effacer les anciennes données au besoin
TRUNCATE city RESTART IDENTITY CASCADE;
TRUNCATE airline_company RESTART IDENTITY CASCADE;
TRUNCATE TABLE flight RESTART IDENTITY CASCADE;
TRUNCATE TABLE flight RESTART IDENTITY CASCADE;
TRUNCATE TABLE flight_booking RESTART IDENTITY CASCADE;
TRUNCATE TABLE booking RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;



--INSERTION DES ROLES
ALTER TABLE role DROP CONSTRAINT IF EXISTS uq_role_name;
ALTER TABLE role ADD CONSTRAINT uq_role_name UNIQUE (name);

INSERT INTO role (name) VALUES ('ROLE_USER') ON CONFLICT (name) DO NOTHING;
INSERT INTO role (name) VALUES ('ROLE_ADMIN') ON CONFLICT (name) DO NOTHING;


--INSERTION DES UTILISATEURS
--Mot de passe de chaque utilisateur : "password" (généré par https://bcrypt-generator.com/)
ALTER TABLE users DROP CONSTRAINT IF EXISTS uq_users_email_role_id;
ALTER TABLE users ADD CONSTRAINT uq_users_email_role_id UNIQUE (email, role_id);

INSERT INTO users (firstname, lastname, email, password, date_of_birth, created_at, role_id) VALUES 
('Jean', 'Dupont', 'user1@example.com', '$2a$12$QWBflxhqzFkNLpCxULZJOe3FlC/5KUP1m4/bRURLAEzcnw4xcK9JW', '1990-05-15', '2026-01-10 14:30:00', (SELECT id FROM role WHERE name = 'ROLE_USER')),
('Marie', 'Curie', 'user2@example.com', '$2a$12$QWBflxhqzFkNLpCxULZJOe3FlC/5KUP1m4/bRURLAEzcnw4xcK9JW', '1985-11-07', '2026-02-14 09:15:00', (SELECT id FROM role WHERE name = 'ROLE_USER')),
('Lucas', 'Martin', 'user3@example.com', '$2a$12$QWBflxhqzFkNLpCxULZJOe3FlC/5KUP1m4/bRURLAEzcnw4xcK9JW', '1998-03-22', '2026-03-01 18:20:00', (SELECT id FROM role WHERE name = 'ROLE_USER')),
('Sophie', 'Bernard', 'user4@example.com', '$2a$12$QWBflxhqzFkNLpCxULZJOe3FlC/5KUP1m4/bRURLAEzcnw4xcK9JW', '1992-08-30', '2026-04-12 11:05:00', (SELECT id FROM role WHERE name = 'ROLE_USER')),
('Thomas', 'Dubois', 'user5@example.com', '$2a$12$QWBflxhqzFkNLpCxULZJOe3FlC/5KUP1m4/bRURLAEzcnw4xcK9JW', '2001-01-25', '2026-05-01 16:40:00', (SELECT id FROM role WHERE name = 'ROLE_USER'))
ON CONFLICT ON CONSTRAINT uq_users_email_role_id DO NOTHING;


--INSERT DES COMPAGNIES AERIENNES
ALTER TABLE airline_company DROP CONSTRAINT IF EXISTS uq_airline_company_name;
ALTER TABLE airline_company ADD CONSTRAINT uq_airline_company_name UNIQUE (name);


INSERT INTO airline_company (name) VALUES ('Air France') ON CONFLICT (name) DO NOTHING;
INSERT INTO airline_company (name) VALUES ('Lufthansa') ON CONFLICT  (name)  DO NOTHING;
INSERT INTO airline_company (name) VALUES ('Transavia') ON CONFLICT (name)  DO NOTHING;
INSERT INTO airline_company (name) VALUES ('SwissAir') ON CONFLICT (name)  DO NOTHING;


--INSERTION DES VILLES
ALTER TABLE city DROP CONSTRAINT IF EXISTS uq_city_name;
ALTER TABLE city ADD CONSTRAINT uq_city_name UNIQUE (name);

INSERT INTO city (name, country) VALUES ('Paris', 'france') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Prague', 'république tchèque') ON CONFLICT  (name)  DO NOTHING;
INSERT INTO city (name, country) VALUES ('Barcelone', 'espagne') ON CONFLICT (name)  DO NOTHING;
INSERT INTO city (name, country) VALUES ('Rome', 'italie') ON CONFLICT (name)  DO NOTHING;
INSERT INTO city (name, country) VALUES ('Londres', 'Royaume-Uni') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Berlin', 'Allemagne') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Lisbonne', 'Portugal') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Amsterdam', 'Pays-Bas') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Athenes', 'Grèce') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Vienne', 'Autriche') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Dublin', 'Irlande') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Bruxelles', 'Belgique') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Stockholm', 'Suède') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Oslo', 'Norvège') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('New York', 'États-Unis') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Montreal', 'Canada') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Tokyo', 'Japon') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Sydney', 'Australie') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Le Caire', 'Égypte') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Marrakech', 'Maroc') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Rio de Janeiro', 'Brésil') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Buenos Aires', 'Argentine') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Bangkok', 'Thaïlande') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Singapour', 'Singapour') ON CONFLICT (name) DO NOTHING;
INSERT INTO city (name, country) VALUES ('Alicante', 'Espagne') ON CONFLICT (name) DO NOTHING;



--INSERTION DES VOLS
ALTER TABLE flight DROP CONSTRAINT IF EXISTS uq_flight_unique_route;
ALTER TABLE flight ADD CONSTRAINT uq_flight_unique_route UNIQUE (company_id, dep_city_id, arr_city_id, dept_time);

INSERT INTO flight (company_id, dep_city_id, arr_city_id, dept_time, arr_time, price) VALUES 
((SELECT id FROM airline_company WHERE name = 'Air France'), (SELECT id FROM city WHERE name = 'Paris'), (SELECT id FROM city WHERE name = 'New York'), '2026-06-01 08:00:00', '2026-06-01 16:30:00', 550.00),
((SELECT id FROM airline_company WHERE name = 'Air France'), (SELECT id FROM city WHERE name = 'Paris'), (SELECT id FROM city WHERE name = 'Rome'), '2026-06-01 10:15:00', '2026-06-01 12:20:00', 89.99),
((SELECT id FROM airline_company WHERE name = 'Air France'), (SELECT id FROM city WHERE name = 'Paris'), (SELECT id FROM city WHERE name = 'Montreal'), '2026-06-02 13:00:00', '2026-06-02 21:15:00', 620.50),
((SELECT id FROM airline_company WHERE name = 'Air France'), (SELECT id FROM city WHERE name = 'Marrakech'), (SELECT id FROM city WHERE name = 'Paris'), '2026-06-03 18:00:00', '2026-06-03 21:15:00', 120.00),
((SELECT id FROM airline_company WHERE name = 'Air France'), (SELECT id FROM city WHERE name = 'Londres'), (SELECT id FROM city WHERE name = 'Paris'), '2026-06-04 07:00:00', '2026-06-04 08:15:00', 65.00),
((SELECT id FROM airline_company WHERE name = 'Air France'), (SELECT id FROM city WHERE name = 'Paris'), (SELECT id FROM city WHERE name = 'Tokyo'), '2026-06-05 23:20:00', '2026-06-06 18:45:00', 980.00)
ON CONFLICT ON CONSTRAINT uq_flight_unique_route DO NOTHING;


INSERT INTO flight (company_id, dep_city_id, arr_city_id, dept_time, arr_time, price) VALUES 
((SELECT id FROM airline_company WHERE name = 'Lufthansa'), (SELECT id FROM city WHERE name = 'Berlin'), (SELECT id FROM city WHERE name = 'Paris'), '2026-06-01 09:00:00', '2026-06-01 10:45:00', 115.00),
((SELECT id FROM airline_company WHERE name = 'Lufthansa'), (SELECT id FROM city WHERE name = 'Berlin'), (SELECT id FROM city WHERE name = 'Prague'), '2026-06-02 14:30:00', '2026-06-02 15:35:00', 75.00),
((SELECT id FROM airline_company WHERE name = 'Lufthansa'), (SELECT id FROM city WHERE name = 'Vienne'), (SELECT id FROM city WHERE name = 'Berlin'), '2026-06-02 19:00:00', '2026-06-02 20:15:00', 95.00),
((SELECT id FROM airline_company WHERE name = 'Lufthansa'), (SELECT id FROM city WHERE name = 'Berlin'), (SELECT id FROM city WHERE name = 'Singapour'), '2026-06-03 21:55:00', '2026-06-04 16:15:00', 740.00),
((SELECT id FROM airline_company WHERE name = 'Lufthansa'), (SELECT id FROM city WHERE name = 'Le Caire'), (SELECT id FROM city WHERE name = 'Berlin'), '2026-06-04 02:10:00', '2026-06-04 06:40:00', 310.00)
ON CONFLICT ON CONSTRAINT uq_flight_unique_route DO NOTHING;

INSERT INTO flight (company_id, dep_city_id, arr_city_id, dept_time, arr_time, price) VALUES 
((SELECT id FROM airline_company WHERE name = 'Transavia'), (SELECT id FROM city WHERE name = 'Paris'), (SELECT id FROM city WHERE name = 'Barcelone'), '2026-06-01 06:30:00', '2026-06-01 08:15:00', 39.99),
((SELECT id FROM airline_company WHERE name = 'Transavia'), (SELECT id FROM city WHERE name = 'Barcelone'), (SELECT id FROM city WHERE name = 'Lisbonne'), '2026-06-02 11:00:00', '2026-06-02 12:55:00', 45.50),
((SELECT id FROM airline_company WHERE name = 'Transavia'), (SELECT id FROM city WHERE name = 'Amsterdam'), (SELECT id FROM city WHERE name = 'Barcelone'), '2026-06-02 16:40:00', '2026-06-02 18:50:00', 59.00),
((SELECT id FROM airline_company WHERE name = 'Transavia'), (SELECT id FROM city WHERE name = 'Paris'), (SELECT id FROM city WHERE name = 'Athenes'), '2026-06-03 07:15:00', '2026-06-03 11:30:00', 84.00),
((SELECT id FROM airline_company WHERE name = 'Transavia'), (SELECT id FROM city WHERE name = 'Dublin'), (SELECT id FROM city WHERE name = 'Paris'), '2026-06-04 14:10:00', '2026-06-04 16:00:00', 49.99),
((SELECT id FROM airline_company WHERE name = 'Transavia'), (SELECT id FROM city WHERE name = 'Bruxelles'), (SELECT id FROM city WHERE name = 'Alicante'), '2026-06-05 12:00:00', '2026-06-05 14:20:00', 68.00)
ON CONFLICT ON CONSTRAINT uq_flight_unique_route DO NOTHING;

INSERT INTO flight (company_id, dep_city_id, arr_city_id, dept_time, arr_time, price) VALUES 
((SELECT id FROM airline_company WHERE name = 'SwissAir'), (SELECT id FROM city WHERE name = 'Paris'), (SELECT id FROM city WHERE name = 'Vienne'), '2026-06-01 09:15:00', '2026-06-01 11:10:00', 145.00),
((SELECT id FROM airline_company WHERE name = 'SwissAir'), (SELECT id FROM city WHERE name = 'Stockholm'), (SELECT id FROM city WHERE name = 'Oslo'), '2026-06-02 08:30:00', '2026-06-02 09:25:00', 105.00),
((SELECT id FROM airline_company WHERE name = 'SwissAir'), (SELECT id FROM city WHERE name = 'New York'), (SELECT id FROM city WHERE name = 'Buenos Aires'), '2026-06-03 22:00:00', '2026-06-04 09:30:00', 890.00),
((SELECT id FROM airline_company WHERE name = 'SwissAir'), (SELECT id FROM city WHERE name = 'Bangkok'), (SELECT id FROM city WHERE name = 'Sydney'), '2026-06-04 15:40:00', '2026-06-05 04:15:00', 610.00),
((SELECT id FROM airline_company WHERE name = 'SwissAir'), (SELECT id FROM city WHERE name = 'Rio de Janeiro'), (SELECT id FROM city WHERE name = 'Paris'), '2026-06-05 20:30:00', '2026-06-06 11:15:00', 1120.00)
ON CONFLICT ON CONSTRAINT uq_flight_unique_route DO NOTHING;


--INSERTION DES RESERVATIONS D'AVION
ALTER TABLE flight_booking DROP CONSTRAINT IF EXISTS uq_flight_booking;
ALTER TABLE flight_booking ADD CONSTRAINT uq_flight_booking UNIQUE (ob_flight_id, ib_flight_id, status);


INSERT INTO flight_booking (nb_passagers, ob_flight_id, ib_flight_id, status) VALUES (2, (SELECT id FROM flight WHERE company_id = (SELECT id FROM airline_company WHERE name = 'Air France') AND dept_time = '2026-06-01 08:00:00'), 
 NULL, 'CONFIRMED') ON CONFLICT ON CONSTRAINT uq_flight_booking DO NOTHING;

INSERT INTO flight_booking (nb_passagers, ob_flight_id, ib_flight_id, status) VALUES (1, (SELECT id FROM flight WHERE company_id = (SELECT id FROM airline_company WHERE name = 'Air France') AND dept_time = '2026-06-01 10:15:00'), (SELECT id FROM flight WHERE company_id = (SELECT id FROM airline_company WHERE name = 'Air France') AND dept_time = '2026-06-04 07:00:00'), 
 'CONFIRMED') ON CONFLICT ON CONSTRAINT uq_flight_booking DO NOTHING;


INSERT INTO flight_booking (nb_passagers, ob_flight_id, ib_flight_id, status) VALUES (4, (SELECT id FROM flight WHERE company_id = (SELECT id FROM airline_company WHERE name = 'Lufthansa') AND dept_time = '2026-06-01 09:00:00'), 
 NULL, 'PENDING') ON CONFLICT ON CONSTRAINT uq_flight_booking DO NOTHING;


INSERT INTO flight_booking (nb_passagers, ob_flight_id, ib_flight_id, status) VALUES (3, (SELECT id FROM flight WHERE company_id = (SELECT id FROM airline_company WHERE name = 'Transavia') AND dept_time = '2026-06-01 06:30:00'), 
 NULL, 'CONFIRMED') ON CONFLICT ON CONSTRAINT uq_flight_booking DO NOTHING;


INSERT INTO flight_booking (nb_passagers, ob_flight_id, ib_flight_id, status) VALUES (2, (SELECT id FROM flight WHERE company_id = (SELECT id FROM airline_company WHERE name = 'SwissAir') AND dept_time = '2026-06-01 09:15:00'), 
 NULL, 'CANCELLED') ON CONFLICT ON CONSTRAINT uq_flight_booking DO NOTHING;


INSERT INTO flight_booking (nb_passagers, ob_flight_id, ib_flight_id, status) VALUES (1, (SELECT id FROM flight WHERE company_id = (SELECT id FROM airline_company WHERE name = 'SwissAir') AND dept_time = '2026-06-02 08:30:00'), 
 NULL, 'CONFIRMED') ON CONFLICT ON CONSTRAINT uq_flight_booking DO NOTHING;


INSERT INTO flight_booking (nb_passagers, ob_flight_id, ib_flight_id, status) VALUES (2, (SELECT id FROM flight WHERE company_id = (SELECT id FROM airline_company WHERE name = 'Lufthansa') AND dept_time = '2026-06-02 14:30:00'), 
NULL, 'CONFIRMED')ON CONFLICT ON CONSTRAINT uq_flight_booking DO NOTHING;


INSERT INTO flight_booking (nb_passagers, ob_flight_id, ib_flight_id, status) VALUES (1, (SELECT id FROM flight WHERE company_id = (SELECT id FROM airline_company WHERE name = 'Transavia') AND dept_time = '2026-06-02 11:00:00'), 
 NULL, 'PENDING') ON CONFLICT ON CONSTRAINT uq_flight_booking DO NOTHING;


INSERT INTO flight_booking (nb_passagers, ob_flight_id, ib_flight_id, status) VALUES (5, (SELECT id FROM flight WHERE company_id = (SELECT id FROM airline_company WHERE name = 'Air France') AND dept_time = '2026-06-02 13:00:00'), 
 NULL, 'CONFIRMED') ON CONFLICT ON CONSTRAINT uq_flight_booking DO NOTHING;


INSERT INTO flight_booking (nb_passagers, ob_flight_id, ib_flight_id, status) VALUES (2, (SELECT id FROM flight WHERE company_id = (SELECT id FROM airline_company WHERE name = 'SwissAir') AND dept_time = '2026-06-03 22:00:00'), 
 NULL, 'CONFIRMED') ON CONFLICT ON CONSTRAINT uq_flight_booking DO NOTHING;


--INSERTION DES RESERVATIONS
ALTER TABLE booking DROP CONSTRAINT IF EXISTS uq_booking;
ALTER TABLE booking ADD CONSTRAINT uq_booking UNIQUE (user_id, created_at, status);

INSERT INTO booking (user_id, flight_booking_id, room_booking_id, car_booking_id, created_at, status) VALUES 
((SELECT id FROM users WHERE email = 'user1@example.com'), 1, NULL, NULL, '2026-05-22 10:00:00', 'CONFIRMED') ON CONFLICT ON CONSTRAINT uq_booking DO NOTHING;

INSERT INTO booking (user_id, flight_booking_id, room_booking_id, car_booking_id, created_at, status) VALUES 
((SELECT id FROM users WHERE email = 'user2@example.com'), 2, NULL, NULL, '2026-05-22 10:15:00', 'CONFIRMED') ON CONFLICT ON CONSTRAINT uq_booking DO NOTHING;

INSERT INTO booking (user_id, flight_booking_id, room_booking_id, car_booking_id, created_at, status) VALUES 
((SELECT id FROM users WHERE email = 'user3@example.com'), 3, NULL, NULL, '2026-05-22 11:00:00', 'PENDING')  ON CONFLICT ON CONSTRAINT uq_booking DO NOTHING;

INSERT INTO booking (user_id, flight_booking_id, room_booking_id, car_booking_id, created_at, status) VALUES 
((SELECT id FROM users WHERE email = 'user1@example.com'), 4, NULL, NULL, '2026-05-22 11:30:00', 'CONFIRMED') ON CONFLICT ON CONSTRAINT uq_booking DO NOTHING;

INSERT INTO booking (user_id, flight_booking_id, room_booking_id, car_booking_id, created_at, status) VALUES 
((SELECT id FROM users WHERE email = 'user4@example.com'), 5, NULL, NULL, '2026-05-22 12:00:00', 'CANCELLED') ON CONFLICT ON CONSTRAINT uq_booking DO NOTHING;

INSERT INTO booking (user_id, flight_booking_id, room_booking_id, car_booking_id, created_at, status) VALUES 
((SELECT id FROM users WHERE email = 'user2@example.com'), 6, NULL, NULL, '2026-05-22 13:00:00', 'CONFIRMED') ON CONFLICT ON CONSTRAINT uq_booking DO NOTHING;

INSERT INTO booking (user_id, flight_booking_id, room_booking_id, car_booking_id, created_at, status) VALUES 
((SELECT id FROM users WHERE email = 'user5@example.com'), 7, NULL, NULL, '2026-05-22 14:00:00', 'CONFIRMED') ON CONFLICT ON CONSTRAINT uq_booking DO NOTHING;

INSERT INTO booking (user_id, flight_booking_id, room_booking_id, car_booking_id, created_at, status) VALUES 
((SELECT id FROM users WHERE email = 'user3@example.com'), 8, NULL, NULL, '2026-05-22 14:45:00', 'PENDING') ON CONFLICT ON CONSTRAINT uq_booking DO NOTHING;

INSERT INTO booking (user_id, flight_booking_id, room_booking_id, car_booking_id, created_at, status) VALUES 
((SELECT id FROM users WHERE email = 'user1@example.com'), 9, NULL, NULL, '2026-05-22 15:30:00', 'CONFIRMED') ON CONFLICT ON CONSTRAINT uq_booking DO NOTHING;

INSERT INTO booking (user_id, flight_booking_id, room_booking_id, car_booking_id, created_at, status) VALUES 
((SELECT id FROM users WHERE email = 'user4@example.com'), 10, NULL, NULL, '2026-05-22 16:00:00', 'CONFIRMED') ON CONFLICT ON CONSTRAINT uq_booking DO NOTHING;


--INSERTION DES HOTELS
ALTER TABLE hotel DROP CONSTRAINT IF EXISTS uq_hotel_city_adress;
ALTER TABLE hotel ADD CONSTRAINT uq_hotel_city_adress UNIQUE (city_id, adress);

INSERT INTO hotel (city_id, adress, stars, img_path, add_info) VALUES
((SELECT id FROM city WHERE name = 'Paris'), '12 rue du Louvre', 4, '/images/hotels/384566763.jpg', '{"title":"Hotel Opera Jardin","summary":"Hotel central, calme et lumineux pour un sejour a Paris","services":["wifi","petit-dejeuner","reception 24h"]}'),
((SELECT id FROM city WHERE name = 'Prague'), '8 Karlova', 4, '/images/hotels/763942237.jpg', '{"title":"Maison Vltava","summary":"Petit hotel de charme proche du centre historique","services":["wifi","petit-dejeuner"]}'),
((SELECT id FROM city WHERE name = 'rome'), '21 Via Navona', 4, '/images/hotels/871745815.jpg', '{"title":"Palazzo Navona","summary":"Adresse cosy pour visiter Rome a pied","services":["wifi","climatisation"]}'),
((SELECT id FROM city WHERE name = 'Marrakech'), '5 rue de la Medina', 5, '/images/hotels/763942237.jpg', '{"title":"Riad Atlas Medina","summary":"Sejour chaleureux avec terrasse dans la medina","services":["wifi","terrasse","petit-dejeuner"]}')
ON CONFLICT ON CONSTRAINT uq_hotel_city_adress DO NOTHING;


--INSERTION DES CHAMBRES
ALTER TABLE room DROP CONSTRAINT IF EXISTS uq_room_hotel_number;
ALTER TABLE room ADD CONSTRAINT uq_room_hotel_number UNIQUE (hotel_id, number);

INSERT INTO room (number, price_per_night, capacity, hotel_id, statham) VALUES
(101, 119.00, 2, (SELECT id FROM hotel WHERE adress = '12 rue du Louvre'), '{"title":"Chambre Confort","summary":"Chambre simple et lumineuse pour deux voyageurs","imgPath":"/images/rooms/371981608.jpg"}'),
(102, 169.00, 3, (SELECT id FROM hotel WHERE adress = '12 rue du Louvre'), '{"title":"Suite Deluxe","summary":"Grande chambre avec coin salon pour petit groupe","imgPath":"/images/rooms/763476568.jpg"}'),
(201, 109.00, 2, (SELECT id FROM hotel WHERE adress = '8 Karlova'), '{"title":"Chambre Classique","summary":"Chambre calme ideale pour un week-end a Prague","imgPath":"/images/rooms/763942222.jpg"}'),
(202, 149.00, 3, (SELECT id FROM hotel WHERE adress = '8 Karlova'), '{"title":"Chambre Balcon","summary":"Chambre avec plus d espace et balcon","imgPath":"/images/rooms/847574085.jpg"}'),
(301, 129.00, 2, (SELECT id FROM hotel WHERE adress = '21 Via Navona'), '{"title":"Chambre Patio","summary":"Chambre confortable proche des quartiers vivants","imgPath":"/images/rooms/371981608.jpg"}'),
(302, 179.00, 4, (SELECT id FROM hotel WHERE adress = '21 Via Navona'), '{"title":"Suite Terrasse","summary":"Suite familiale pour un sejour a Rome","imgPath":"/images/rooms/847574085.jpg"}'),
(401, 99.00, 2, (SELECT id FROM hotel WHERE adress = '5 rue de la Medina'), '{"title":"Chambre Riad","summary":"Chambre calme avec ambiance riad traditionnelle","imgPath":"/images/rooms/763476568.jpg"}'),
(402, 139.00, 3, (SELECT id FROM hotel WHERE adress = '5 rue de la Medina'), '{"title":"Suite Medina","summary":"Suite spacieuse pour profiter du sejour a Marrakech","imgPath":"/images/rooms/763942222.jpg"}')
ON CONFLICT ON CONSTRAINT uq_room_hotel_number DO NOTHING;