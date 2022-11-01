--
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS pk_users_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.planetvotes DROP CONSTRAINT IF EXISTS pk_planetvotes_id CASCADE;
--
--
--
--
-- DROP TABLE IF EXISTS public.users;
-- CREATE TABLE users (
--     id serial,
--     user_name varchar,
--     password varchar
-- );
--
-- DROP TABLE IF EXISTS public.planetvotes;
-- CREATE TABLE planetvotes (
--     id serial,
--     planet_id integer,
--     planet_name varchar,
--     user_id integer,
--     submission_time timestamp without time zone
-- );
--
-- ALTER TABLE ONLY users
--     ADD CONSTRAINT pk_users_id PRIMARY KEY (id);
-- ALTER TABLE ONLY planetvotes
--     ADD CONSTRAINT pk_planetvotes_id PRIMARY KEY (id);
--
-- ALTER TABLE ONLY planetvotes
--     ADD CONSTRAINT fk_votes FOREIGN KEY (user_id) REFERENCES users(id);

DROP TABLE IF EXISTS users;

CREATE TABLE users
(
	id SERIAL
		CONSTRAINT users_pk
			PRIMARY KEY,
	user_name varchar,
	password varchar
);
