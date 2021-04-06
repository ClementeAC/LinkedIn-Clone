create database LinkedIn;
SELECT CURRENT_TIMESTAMP(0)::timestamp at time zone 'UTC' at time zone 'America/Caracas';

create table code (
	verification_code VARCHAR (10)
);

create table app_user (
	user_id serial PRIMARY KEY,
	username VARCHAR (60),
	email VARCHAR (255),
	phone VARCHAR (20),
	img VARCHAR (100),
	password VARCHAR (120),
	connect integer,
	FOREIGN KEY (connect)
        REFERENCES app_user (user_id)
		ON DELETE SET NULL
);

create table company (
	company_id serial PRIMARY KEY,
	name VARCHAR (100),
	descripcion VARCHAR (600),
	location VARCHAR (120),
	website VARCHAR (120)
);

create table user_company (
	user_company_id serial PRIMARY KEY,
	user_id integer,
	company integer,
	FOREIGN KEY (user_id)
        REFERENCES app_user (user_id)
        ON DELETE CASCADE,
	FOREIGN KEY (company)
        REFERENCES company (company_id)
        ON DELETE CASCADE
);

create table rol (
	rol_id serial PRIMARY KEY,
	name VARCHAR (60),
	user_id integer,
	FOREIGN KEY (user_id)
        REFERENCES user_company (user_company_id)
        ON DELETE CASCADE
);

create table profile (
	profile_id serial PRIMARY KEY,
	user_id integer,
	description VARCHAR (600),
	website VARCHAR (120),
	birthday VARCHAR (20),
	country VARCHAR (100),
	FOREIGN KEY (user_id)
        REFERENCES app_user (user_id)
        ON DELETE CASCADE
);

create table profile_language (
	profile_language_id serial PRIMARY KEY,
	profile integer,
	FOREIGN KEY (profile)
        REFERENCES profile (profile_id)
        ON DELETE CASCADE
);

create table projects (
	projects_id serial PRIMARY KEY,
	profile integer,
	FOREIGN KEY (profile)
        REFERENCES profile (profile_id)
        ON DELETE CASCADE
);

create table work_experience (
	work_experience_id serial PRIMARY KEY,
	profile integer,
	FOREIGN KEY (profile)
        REFERENCES profile (profile_id)
        ON DELETE CASCADE
);

create table education (
	education_id serial PRIMARY KEY,
	profile integer,
	FOREIGN KEY (profile)
        REFERENCES profile (profile_id)
        ON DELETE CASCADE
);

create table skills (
	skills_id serial PRIMARY KEY,
	profile integer,
	FOREIGN KEY (profile)
        REFERENCES profile (profile_id)
        ON DELETE CASCADE
);

create table achievements (
	achievements_id serial PRIMARY KEY,
	profile integer,
	FOREIGN KEY (profile)
        REFERENCES profile (profile_id)
        ON DELETE CASCADE
);

create table interests (
	interests_id serial PRIMARY KEY,
	profile integer,
	FOREIGN KEY (profile)
        REFERENCES profile (profile_id)
        ON DELETE CASCADE
);


create table publication (
	publication_id serial PRIMARY KEY,
	user_id integer,
	descripcion VARCHAR (600),
	img VARCHAR (100),
	FOREIGN KEY (user_id)
        REFERENCES app_user (user_id)
        ON DELETE CASCADE
);

create table recommend (
	recommend_id serial PRIMARY KEY,
	publication integer,
	FOREIGN KEY (publication)
        REFERENCES publication (publication_id)
        ON DELETE CASCADE
);

create table celebrate (
	celebrate_id serial PRIMARY KEY,
	publication integer,
	FOREIGN KEY (publication)
        REFERENCES publication (publication_id)
        ON DELETE CASCADE
);

create table charmed (
	charmed_id serial PRIMARY KEY,
	publication integer,
	FOREIGN KEY (publication)
        REFERENCES publication (publication_id)
        ON DELETE CASCADE
);

create table interesting (
	interesting_id serial PRIMARY KEY,
	publication integer,
	FOREIGN KEY (publication)
        REFERENCES publication (publication_id)
        ON DELETE CASCADE
);

create table comment (
	comment_id serial PRIMARY KEY,
	publication integer,
	FOREIGN KEY (publication)
        REFERENCES publication (publication_id)
        ON DELETE CASCADE
);