CREATE DATABASE IF NOT EXISTS DB_lostnomore;

USE DB_lostnomore;


/* Création des tables */

CREATE TABLE IF NOT EXISTS lnm_users (
	id_user int PRIMARY KEY AUTO_INCREMENT,
	fname_user varchar(50),
	lname_user varchar(50),
	mail_user varchar(50),
	password_user varchar(100)
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS lnm_historic (
	id_historic int PRIMARY KEY AUTO_INCREMENT,
	depart_historic varchar(100),
	arriv_historic varchar(100),
	date_historic TIMESTAMP,
	user_historic int,
	FOREIGN KEY (user_historic) REFERENCES lnm_users(id_user)
) ENGINE=InnoDB;


/* INSERTION DE QUELQUES DONNEES DE BASE */

INSERT INTO lnm_users (fname_user, lname_user, mail_user, password_user) VALUES 
	('Jean','Dupont', 'jdupont@gmail.com', 'root'),
	('Pierre','Martin', 'pmartin@gmail.com', 'password'),
	('Michel','Breuil', 'mbreuil@gmail.com', 'mypassword');

INSERT INTO lnm_historic (depart_historic, arriv_historic, date_historic, user_historic) VALUES 
	('6 Rue Rougemont, 75009 Paris','134 Rue Gallieni, 92100 Boulogne-Billancourt','2017-08-16 23:59:59',1),
	('112 Boulevard Saint-Germain, 75006 Paris','80 Rue de Clichy, 75009 Paris','2017-08-17 23:59:59',2),
	('134 Rue Gallieni, 92100 Boulogne-Billancourt','6 Rue Rougemont, 75009 Paris','2017-08-16 00:10:10',1);