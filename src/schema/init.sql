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
  client_name       TEXT,
  client_vat_number TEXT,
  client_address    TEXT,
  client_province   TEXT,
  client_locality   TEXT,
  client_zipcode    TEXT,
  client_country    TEXT,
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
INSERT INTO config (key, value) values ('user:name', 'Cesc');

-- INSERTING CLIENT
INSERT INTO client (name, vat_number, address, province, locality, zipcode, country) values ('Pepito', 'C123456787', 'C/ Pepito', 'Barcelona', 'Barcelona', '08032', 'Spain');
-- INSERTING INVOICE
INSERT INTO invoice (client_id, emitted) values (1, '1454274155840');
-- INSERT INTO config (key, value) values ('pit', '18'); --irpf
