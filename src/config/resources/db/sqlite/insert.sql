INSERT INTO film(id, fassung, barcode, rating, filmart, preis, release, genre, erzeugt, aktualisiert) VALUES
    (1,0,'0-000000000001',5,'DVD',11.1,'2022-02-01','ACTION','2022-02-01 00:00:00','2022-02-01 00:00:00');
INSERT INTO film(id, fassung, barcode, rating, filmart, preis, release, genre, erzeugt, aktualisiert) VALUES
    (20,0,'0-000000000020',4,'DVD',22.2,'2022-02-01','ACTION','2022-02-01 00:00:00','2022-02-01 00:00:00');
INSERT INTO film(id, fassung, barcode, rating, filmart, preis, release, genre, erzeugt, aktualisiert) VALUES
    (30,0,'0-000000000030',3,'DVD',33.3,'2022-02-01','HORROR','2022-02-01 00:00:00','2022-02-01 00:00:00');
INSERT INTO film(id, fassung, barcode, rating, filmart, preis, release, genre, erzeugt, aktualisiert) VALUES
    (40,0,'0-000000000040',2,'DVD',44.4,'2022-02-01','ACTION, COMEDY','2022-02-01 00:00:00','2022-02-01 00:00:00');
INSERT INTO film(id, fassung, barcode, rating, filmart, preis, release, genre, erzeugt, aktualisiert) VALUES
    (50,0,'0-000000000050',1,'BLURAY',55.5,'2022-02-01','COMEDY','2022-02-01 00:00:00','2022-02-01 00:00:00');
INSERT INTO film(id, fassung, barcode, rating, filmart, preis, release, genre, erzeugt, aktualisiert) VALUES
    (60,0,'0-000000000060',4,'BLURAY',66.6,'2022-02-01','ACTION, COMEDY','2022-02-01 00:00:00','2022-02-01 00:00:00');

INSERT INTO titel(id, titel, untertitel, film_id) VALUES
    (12,'Die Welt','eins',1);
INSERT INTO titel(id, titel, untertitel, film_id) VALUES
    (22,'Das Ende','zwei',20);
INSERT INTO titel(id, titel, untertitel, film_id) VALUES
    (32,'Der Anfang','drei',30);
INSERT INTO titel(id, titel, untertitel, film_id) VALUES
    (42,'Der Mond','eins',40);
INSERT INTO titel(id, titel, untertitel, film_id) VALUES
    (52,'Die Sonne','zwei',50);
INSERT INTO titel(id, titel, untertitel, film_id) VALUES
    (62,'Die Mitte','drei',60);

INSERT INTO abbildung(id, beschriftung, content_type, film_id) VALUES
    (11,'Abb. 1','img/png',1);
INSERT INTO abbildung(id, beschriftung, content_type, film_id) VALUES
    (21,'Abb. 1','img/png',20);
INSERT INTO abbildung(id, beschriftung, content_type, film_id) VALUES
    (31,'Abb. 2','img/png',20);
INSERT INTO abbildung(id, beschriftung, content_type, film_id) VALUES
    (41,'Abb. 1','img/png',30);
INSERT INTO abbildung(id, beschriftung, content_type, film_id) VALUES
    (51,'Abb. 2','img/png',30);
INSERT INTO abbildung(id, beschriftung, content_type, film_id) VALUES
    (61,'Abb. 1','img/png',40);
