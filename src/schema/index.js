import fs from 'fs';
import sqlite from 'sqlite3';

let dbpath = "test.db";

let db;
try {
  fs.accessSync('test.db', fs.F_OK);
  db = new sqlite.Database(dbpath);
}
catch(e) {
  db = new sqlite.Database(dbpath);
  // Deploy initial schema when the db file is brand new.
  console.log('Looks like this is the first time: initializing schema.');
  db.exec( fs.readFileSync(`${__dirname}/init.sql`, 'utf8'), (err) => {
    if (err) throw(`Unable to initialize schema: ${err}`);
  });
}

//TODO: check for schema version when we implement versioning and migrations :-)

export default db;
