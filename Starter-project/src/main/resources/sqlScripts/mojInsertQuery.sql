INSERT INTO "projekat"("id", "naziv", "oznaka","opis")
VALUES (1, 'AirBnB', 'Web','Veb aplikacija za airbnb');
INSERT INTO "projekat"("id", "naziv", "oznaka","opis")
VALUES (2, 'Mario', 'Android','Android igrica slicna super mariju');
INSERT INTO "projekat"("id", "naziv", "oznaka","opis")
VALUES (3, 'Banka', 'DataBase','Baza podataka namenjena za rad banke');
INSERT INTO "projekat"("id", "naziv", "oznaka","opis")
VALUES (4, 'Nis', 'Integracia','Integracija novog sistema sa starim Nisovim');

INSERT INTO "projekat"("id","naziv","oznaka","opis")
VALUES (-100,'TestNaz','TestOzn','TestOpis');


INSERT INTO "smer"("id", "naziv", "oznaka")
VALUES (1, 'Elektrotehnika', 'E2');
INSERT INTO "smer"("id", "naziv", "oznaka")
VALUES (2, 'Softverski', 'SIT');
INSERT INTO "smer"("id", "naziv", "oznaka")
VALUES (3, 'Inzenjerstvo', 'IT');
INSERT INTO "smer"("id", "naziv", "oznaka")
VALUES (4, 'Informacioni', 'II');

INSERT INTO "smer"("id", "naziv", "oznaka")
VALUES (-100, 'TestNaz', 'TestOzn');


INSERT INTO "grupa"("id", "oznaka", "smer")
VALUES (1, 'A', 4);
INSERT INTO "grupa"("id", "oznaka", "smer")
VALUES (2, 'B', 3);
INSERT INTO "grupa"("id", "oznaka", "smer")
VALUES (3, 'C', 2);
INSERT INTO "grupa"("id", "oznaka", "smer")
VALUES (4, 'D', 1);

INSERT INTO "grupa"("id", "oznaka", "smer")
VALUES (-100, 'TestOzn', 1);


INSERT INTO "student"("id", "ime", "prezime","broj_indeksa","grupa","projekat")
VALUES (1, 'Dusan','Milasinovic','IT1-2018',2,3);
INSERT INTO "student"("id", "ime", "prezime","broj_indeksa","grupa","projekat")
VALUES (2, 'Milos','Milasinovic','IT3-2015',3,4);
INSERT INTO "student"("id", "ime", "prezime","broj_indeksa","grupa","projekat")
VALUES (3, 'Petar','Petrovic','II4-2017',4,1);
INSERT INTO "student"("id", "ime", "prezime","broj_indeksa","grupa","projekat")
VALUES (4, 'Jovan','Jovanovic','IM24-2016',1,2);

INSERT INTO "student"("id", "ime", "prezime","broj_indeksa","grupa","projekat")
VALUES (-100, 'TestIme','TestPrez','TestIndeks',1,2);
