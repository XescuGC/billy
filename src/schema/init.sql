CREATE TABLE client(
  id         INTEGER PRIMARY KEY,
  name       TEXT,
  address    TEXT,
  vat_number TEXT
);

CREATE TABLE item(
  id          INTEGER PRIMARY KEY,
  description TEXT,
  price       INTEGER
);

CREATE TABLE invoice(
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id  INTEGER REFERENCES client(id),
  emitted    INTEGER
);

CREATE TABLE invoice_item(
  invoice_id INTEGER REFERENCES invoice(id),
  item_id    INTEGER REFERENCES item(id),
  PRIMARY KEY (invoice_id, item_id)
);

