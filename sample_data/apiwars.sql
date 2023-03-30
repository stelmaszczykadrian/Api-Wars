DROP TABLE IF EXISTS users;

CREATE TABLE users
(
	id SERIAL
		CONSTRAINT users_pk
			PRIMARY KEY,
	user_name varchar,
	password varchar
);
