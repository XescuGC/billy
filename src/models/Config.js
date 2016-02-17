import Jsmoo from 'jsmoo';
import db         from '../schema';
import WithSchema from './roles/WithSchema';

class Config extends Jsmoo {}
Config.with(WithSchema);

Config.has({
  key:       { is: 'rw', isa: 'string' },
  value:     { is: 'rw' },
  is_stored: { is: 'rw', default: false },
});

const getStatement = db.prepare('SELECT * FROM config WHERE key=$key');
Config.get = function(key) {
  return new Promise( (resolve, reject) => {
    getStatement.get( { $key: key }, function(err, row) {
      if (err) return reject(err);
      if (row) return resolve(Config._inflate(row));
      resolve( new Config({ key }) );
    });
  });
}

Config.set = function(key, value) {
  return Config.get(key).then( cfg => {
    cfg.value = value;
    cfg.save();
  });
}

Config.prototype.save = function() {
  if ( !this.is_stored ) return this.insert();
  return this.update();
}

const insertStatement = db.prepare('INSERT INTO config (key, value, is_stored) values ($key, $value, 1)');
Config.prototype.insert = function() {
  let $this = this;
  return new Promise( (resolve, reject) => {
    insertStatement.run( this._binded(), function(err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

const updateStatement = db.prepare('UPDATE config set value=$value WHERE key=$key');
Config.prototype.update = function() {
  return new Promise( (resolve, reject) => {
    updateStatement.run( this._binded(), function(err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

const deleteStatement = db.prepare('DELETE FROM config WHERE key=$key');
Config.prototype.delete = function() {
  if ( !this.id ) throw( new Error('Unable to delete befor insert!') );
  return new Promise( (resolve, reject) => {
    db.run( deleteStatement, { $key: this.key }, function(err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

Config.getAll = function() {
  return this.find().then( rows => {
    let config = {};
    rows.forEach( item => { config[item.key] = JSON.parse(item.value) });
    return config;
  });
};

Config._inflate = function(row) {
  row.is_stored = true;
  return new Config(row);
}

Config.prototype._binded = function() { return { $key: this.key, $value: this.value } }

export default Config;
