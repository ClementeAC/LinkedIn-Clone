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
	img VARCHAR (1000),
	password VARCHAR (120)
);

create table connect (
	connect_id serial PRIMARY KEY,
	user_id integer,
	connect integer,
	FOREIGN KEY (user_id)
        REFERENCES app_user (user_id)
        ON DELETE CASCADE,
	FOREIGN KEY (connect)
        REFERENCES app_user (user_id)
        ON DELETE CASCADE
);

create table profile (
	profile_id serial PRIMARY KEY,
	user_id integer,
	name VARCHAR (80),
  	last_name VARCHAR (80),
	description VARCHAR (600),
	website VARCHAR (120),
	birthday VARCHAR (50),
	country VARCHAR (100),
	language VARCHAR (50),
	FOREIGN KEY (user_id)
        REFERENCES app_user (user_id)
        ON DELETE CASCADE
);

create table company (
	company_id serial PRIMARY KEY,
	name VARCHAR (100),
	location VARCHAR (120),
	user_id integer,
	FOREIGN KEY (user_id)
        REFERENCES profile (profile_id)
        ON DELETE CASCADE
);

create table rol (
	rol_id serial PRIMARY KEY,
	name VARCHAR (60),
	user_id integer,
	FOREIGN KEY (user_id)
        REFERENCES company (company_id)
        ON DELETE CASCADE
);

create table projects (
	projects_id serial PRIMARY KEY,
	profile integer,
	value VARCHAR (500),
  	url VARCHAR (200),
	FOREIGN KEY (profile)
        REFERENCES profile (profile_id)
        ON DELETE CASCADE
);

create table work_experience (
	work_experience_id serial PRIMARY KEY,
	profile integer,
	title VARCHAR (100),
	year TIMESTAMP,
	place VARCHAR (200),
	FOREIGN KEY (profile)
        REFERENCES profile (profile_id)
        ON DELETE CASCADE
);

create table education (
	education_id serial PRIMARY KEY,
	profile integer,
	title VARCHAR (100),
	year TIMESTAMP,
	place VARCHAR (200),
	FOREIGN KEY (profile)
        REFERENCES profile (profile_id)
        ON DELETE CASCADE
);

create table skills (
	skills_id serial PRIMARY KEY,
	profile integer,
	value VARCHAR (500),
	FOREIGN KEY (profile)
        REFERENCES profile (profile_id)
        ON DELETE CASCADE
);

create table achievements (
	achievements_id serial PRIMARY KEY,
	profile integer,
	title VARCHAR (100),
	year TIMESTAMP,
	place VARCHAR (200),
	FOREIGN KEY (profile)
        REFERENCES profile (profile_id)
        ON DELETE CASCADE
);

create table interests (
	interests_id serial PRIMARY KEY,
	profile integer,
	value VARCHAR (500),
	FOREIGN KEY (profile)
        REFERENCES profile (profile_id)
        ON DELETE CASCADE
);


create table publication (
	publication_id serial PRIMARY KEY,
	user_id integer,
	date TIMESTAMP,
	descripcion VARCHAR (600),
	img VARCHAR (1000),
	job_offer boolean DEFAULT 'false',
	FOREIGN KEY (user_id)
        REFERENCES profile (profile_id)
        ON DELETE CASCADE
);

create table user_reaction (
	user_reaction_id serial PRIMARY KEY,
	user_id integer,
	date TIMESTAMP,
	publication integer,
	charmed  boolean DEFAULT 'false',
	interesting  boolean DEFAULT 'false',
	recommend  boolean DEFAULT 'false',
	celebrate boolean DEFAULT 'false',
	FOREIGN KEY (user_id)
        REFERENCES app_user (user_id)
        ON DELETE CASCADE,
	FOREIGN KEY (publication)
        REFERENCES publication (publication_id)
        ON DELETE CASCADE
);

create table user_comment (
	user_reaction_id serial PRIMARY KEY,
	user_id integer,
	date TIMESTAMP,
	publication integer,
	comment VARCHAR (600),
	FOREIGN KEY (user_id)
        REFERENCES app_user (user_id)
        ON DELETE CASCADE,
	FOREIGN KEY (publication)
        REFERENCES publication (publication_id)
        ON DELETE CASCADE
);

create table notification (
	notification_id serial PRIMARY KEY,
	user_id integer,
	date TIMESTAMP,
	title VARCHAR (100),
	value VARCHAR (200),
	type VARCHAR (100),
	connect integer,
	FOREIGN KEY (user_id)
        REFERENCES app_user (user_id)
        ON DELETE CASCADE
);


-> Home {
	//yo
	- modificarla = 
	- Eliminarla =

	//tu y yo
	- getPublication join reacciones join commentarios join isguardada (de mis connects)
	- Enviarla =
	- Guardarla =
	- Reaccionar =
	- Comentar = 
}

-> To post {
	- Crear publicacion = URLImagen, textPublication, (isOfertadeTrabajo)
}

-> Notification {
	- getNotificaciones = 
	- DeleteNotificacion 
}

-> Perfil{
	- getUser + getProfile
	- modificar 
	- Eliminar
}

