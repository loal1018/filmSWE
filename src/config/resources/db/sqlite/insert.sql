-- Copyright (C) 2023 - present Juergen Zimmermann, Hochschule Karlsruhe
--
-- This program is free software: you can redistribute it and/or modify
-- it under the terms of the GNU General Public License as published by
-- the Free Software Foundation, either version 3 of the License, or
-- (at your option) any later version.
--
-- This program is distributed in the hope that it will be useful,
-- but WITHOUT ANY WARRANTY; without even the implied warranty of
-- MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
-- GNU General Public License for more details.
--
-- You should have received a copy of the GNU General Public License
-- along with this program.  If not, see <https://www.gnu.org/licenses/>.

-- "Konzeption und Realisierung eines aktiven Datenbanksystems"
-- "Verteilte Komponenten und Datenbankanbindung"
-- "Design Patterns"
-- "Freiburger Chorbuch"
-- "Maschinelle Lernverfahren zur Behandlung von Bonitätsrisiken im Mobilfunkgeschäft"
-- "Software Pioneers"

INSERT INTO buch(id, version, isbn, rating, art, preis, rabatt, lieferbar, datum, homepage, schlagwoerter, erzeugt, aktualisiert) VALUES
    (1,0,'978-3-897-22583-1',4,'DRUCKAUSGABE',11.1,0.011,true,'2022-02-01','https://acme.at','JAVASCRIPT','2022-02-01 00:00:00','2022-02-01 00:00:00');
INSERT INTO buch(id, version, isbn, rating, art, preis, rabatt, lieferbar, datum, homepage, schlagwoerter, erzeugt, aktualisiert) VALUES
    (20,0,'978-3-827-31552-6',2,'KINDLE',22.2,0.022,true,'2022-02-02','https://acme.biz','TYPESCRIPT','2022-02-02 00:00:00','2022-02-02 00:00:00');
INSERT INTO buch(id, version, isbn, rating, art, preis, rabatt, lieferbar, datum, homepage, schlagwoerter, erzeugt, aktualisiert) VALUES
    (30,0,'978-0-201-63361-0',3,'DRUCKAUSGABE',33.3,0.033,true,'2022-02-03','https://acme.com','JAVASCRIPT,TYPESCRIPT','2022-02-03 00:00:00','2022-02-03 00:00:00');
INSERT INTO buch(id, version, isbn, rating, art, preis, rabatt, lieferbar, datum, homepage, schlagwoerter, erzeugt, aktualisiert) VALUES
    (40,0,'978-0-007-09732-6',4,'DRUCKAUSGABE',44.4,0.044,true,'2022-02-04','https://acme.de',null,'2022-02-04 00:00:00','2022-02-04 00:00:00');
INSERT INTO buch(id, version, isbn, rating, art, preis, rabatt, lieferbar, datum, homepage, schlagwoerter, erzeugt, aktualisiert) VALUES
    (50,0,'978-3-824-40481-0',2,'KINDLE',55.5,0.055,true,'2022-02-05','https://acme.es','TYPESCRIPT','2022-02-05 00:00:00','2022-02-05 00:00:00');
INSERT INTO buch(id, version, isbn, rating, art, preis, rabatt, lieferbar, datum, homepage, schlagwoerter, erzeugt, aktualisiert) VALUES
    (60,0,'978-3-540-43081-0',1,'KINDLE',66.6,0.066,true,'2022-02-06','https://acme.fi','TYPESCRIPT','2022-02-06 00:00:00','2022-02-06 00:00:00');

INSERT INTO titel(id, titel, untertitel, buch_id) VALUES
    (1,'Alpha','alpha',1);
INSERT INTO titel(id, titel, untertitel, buch_id) VALUES
    (20,'Beta',null,20);
INSERT INTO titel(id, titel, untertitel, buch_id) VALUES
    (30,'Gamma','gamma',30);
INSERT INTO titel(id, titel, untertitel, buch_id) VALUES
    (40,'Delta','delta',40);
INSERT INTO titel(id, titel, untertitel, buch_id) VALUES
    (50,'Epsilon','epsilon',50);
INSERT INTO titel(id, titel, untertitel, buch_id) VALUES
    (60,'Phi','phi',60);

INSERT INTO abbildung(id, beschriftung, content_type, buch_id) VALUES
    (1,'Abb. 1','img/png',1);
INSERT INTO abbildung(id, beschriftung, content_type, buch_id) VALUES
    (20,'Abb. 1','img/png',20);
INSERT INTO abbildung(id, beschriftung, content_type, buch_id) VALUES
    (21,'Abb. 2','img/png',20);
INSERT INTO abbildung(id, beschriftung, content_type, buch_id) VALUES
    (30,'Abb. 1','img/png',30);
INSERT INTO abbildung(id, beschriftung, content_type, buch_id) VALUES
    (31,'Abb. 2','img/png',30);
INSERT INTO abbildung(id, beschriftung, content_type, buch_id) VALUES
    (40,'Abb. 1','img/png',40);
INSERT INTO abbildung(id, beschriftung, content_type, buch_id) VALUES
    (50,'Abb. 1','img/png',50);
INSERT INTO abbildung(id, beschriftung, content_type, buch_id) VALUES
    (60,'Abb. 1','img/png',60);
