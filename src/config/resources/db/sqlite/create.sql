CREATE TABLE IF NOT EXISTS film (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    fassung        INTEGER NOT NULL DEFAULT 0,
    barcode        TEXT NOT NULL UNIQUE,
    rating         INTEGER NOT NULL CHECK (rating >= 0 AND rating <= 5),
    filmart        TEXT,
    preis          REAL,
    release        TEXT,
    genre          TEXT,
    erzeugt        TEXT NOT NULL,
    aktualisiert   TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS film_barcode_idx ON film(barcode);

CREATE TABLE IF NOT EXISTS titel (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    titel       TEXT NOT NULL,
    untertitel  TEXT,
    film_id     INTEGER NOT NULL UNIQUE REFERENCES film
);


CREATE TABLE IF NOT EXISTS abbildung (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    beschriftung    TEXT NOT NULL,
    content_type    TEXT NOT NULL,
    film_id         INTEGER NOT NULL REFERENCES film
);
CREATE INDEX IF NOT EXISTS abbildung_film_id_idx ON abbildung(film_id);
