create database LinkedIn;
SELECT CURRENT_TIMESTAMP(0)::timestamp at time zone 'UTC' at time zone 'America/Caracas';

create table app_user (
	user_id serial PRIMARY KEY,
	username VARCHAR (60) NOT NULL,
	email VARCHAR (255) NOT NULL,
	password VARCHAR (120) NOT NULL
);

