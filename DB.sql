create database LinkedIn;
SELECT CURRENT_TIMESTAMP(0)::timestamp at time zone 'UTC' at time zone 'America/Caracas';

create table app_user (
	user_id serial PRIMARY KEY,
	username VARCHAR (60),
	email VARCHAR (255),
	phone VARCHAR (20),
	password VARCHAR (120)
);

create table code (
	verification_code VARCHAR (10)
);