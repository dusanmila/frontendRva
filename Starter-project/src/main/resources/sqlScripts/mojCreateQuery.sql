DROP TABLE IF EXISTS projekat CASCADE;

DROP TABLE IF EXISTS smer CASCADE;

DROP TABLE IF EXISTS grupa CASCADE;

DROP TABLE IF EXISTS student CASCADE;


DROP SEQUENCE IF EXISTS projekat_seq;

DROP SEQUENCE IF EXISTS smer_seq;

DROP SEQUENCE IF EXISTS grupa_seq;

DROP SEQUENCE IF EXISTS student_seq;


CREATE TABLE projekat(
	id integer not null,
	naziv varchar(100),
	oznaka varchar(10),
	opis varchar(500)
);


CREATE TABLE smer(
	id integer not null,
	naziv varchar(100),
	oznaka varchar(50)
);


CREATE TABLE grupa(
	id integer not null,
	oznaka varchar(10),
	smer integer not null
);


CREATE TABLE student(
id integer not null,
ime varchar(50) ,
prezime varchar(50),
broj_indeksa varchar(20),
grupa integer not null,
projekat integer not null
);



ALTER TABLE projekat ADD CONSTRAINT pk_projekat PRIMARY KEY(id);

ALTER TABLE smer ADD CONSTRAINT pk_smer PRIMARY KEY(id);

ALTER TABLE grupa ADD CONSTRAINT pk_grupa PRIMARY KEY(id);

ALTER TABLE student ADD CONSTRAINT pk_student PRIMARY KEY(id);


ALTER TABLE grupa ADD CONSTRAINT fk_grupa_smer FOREIGN KEY(smer) REFERENCES smer(id);

ALTER TABLE student ADD CONSTRAINT fk_student_grupa FOREIGN KEY(grupa) REFERENCES grupa(id);

ALTER TABLE student ADD CONSTRAINT fk_student_projekat FOREIGN KEY(projekat) REFERENCES projekat(id);



CREATE INDEX idxpk_projekat ON projekat(id);
CREATE INDEX idxpk_smer ON smer(id);
CREATE INDEX idxpk_grupa ON grupa(id);

CREATE INDEX idxpk_student ON student(id);


CREATE INDEX idxfk_grupa_smer ON grupa(smer);

CREATE INDEX idxfk_student_grupa ON student(grupa);

CREATE INDEX idxfk_student_projekat ON student(projekat);


CREATE SEQUENCE projekat_seq
INCREMENT 1;

CREATE SEQUENCE smer_seq
INCREMENT 1;

CREATE SEQUENCE grupa_seq
INCREMENT 1;

CREATE SEQUENCE student_seq
INCREMENT 1;