CREATE TABLE client(
  id         INTEGER PRIMARY KEY,
  name       TEXT,
  vat_number TEXT,
  address    TEXT,
  province   TEXT,
  locality   TEXT,
  zipcode    TEXT,
  country    TEXT
);

CREATE TABLE item(
  id          INTEGER PRIMARY KEY,
  invoice_id  INTEGER REFERENCES invoice(id),
  description TEXT,
  price       INTEGER
);

CREATE TABLE invoice(
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id         INTEGER REFERENCES client(id),
  client            TEXT,    -- JSON
  emitted           INTEGER,
  vat               INTEGER,
  pit               INTEGER, -- IRPF
  status            TEXT
);

CREATE TABLE config(
  key       TEXT PRIMARY KEY,
  value     TEXT
);

-- INSERTING CONFIG
INSERT INTO config (key, value) values ('vat',       '21'  );
INSERT INTO config (key, value) values ('currency',  '€'   );
INSERT INTO config (key, value) values ('user:name', 'Billy the invoicer');
INSERT INTO config (key, value) values ('user:vat_number', 'D-666');
INSERT INTO config (key, value) values ('user:address', 'On the beach');
INSERT INTO config (key, value) values ('user:province', 'Barcelona');
INSERT INTO config (key, value) values ('user:locality', 'Barcelona');
INSERT INTO config (key, value) values ('user:zipcode', '08025');
INSERT INTO config (key, value) values ('user:country', 'España');

INSERT INTO config (key, value) values ('invoice_number', '0');
INSERT INTO config (key, value) values ('invoice_number_template', '{{number}}');
-- INSERT INTO config (key, value) values ('pit', '18'); --irpf
