import fs from 'fs';
import sqlite from 'sqlite3';

let dbpath = "../../test.db";

const mustDeploy = !fs.existsSync(file);
let   db         = new sqlite.Database(dbpath);

// Deploy initial schema when the db file is brand new.
if ( mustDeploy ) {
  console.log('Looks like this is the first time: initializing schema.');
  db.run( fs.readFileSync('./init.sql', 'utf8'), (err) => {
    if (err) throw(`Unable to initialize schema: ${err}`);
  });
}

//TODO: check for schema version when we implement versioning and migrations :-)

export default db;
