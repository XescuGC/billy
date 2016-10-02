import Jsmoo      from 'jsmoo';
import db         from '../schema';
import WithSchema from './roles/WithSchema';

class Client extends Jsmoo {}
Client.does(WithSchema);

Client.has({
  id:         { is: 'rw', isa: 'number' },
  name:       { is: 'rw', isa: 'string' },
  vat_number: { is: 'rw', isa: 'string' },
  address:    { is: 'rw', isa: 'string' },
  province:   { is: 'rw', isa: 'string' },
  locality:   { is: 'rw', isa: 'string' },
  zipcode:    { is: 'rw', isa: 'string' },
  country:    { is: 'rw', isa: 'string' },
});

Client.prototype.save = function() {
  if ( !this.id ) return this.insert();
  return this.update();
}

const insertStatement = db.prepare('INSERT INTO client (name, vat_number, address, province, locality, zipcode, country) values ($name, $vat_number, $address, $province, $locality, $zipcode, $country)');
Client.prototype.insert = function() {
  let $this = this;
  return new Promise( (resolve, reject) => {
    insertStatement.run( this._binded(), function(err) {
      if (err) return reject(err);
      $this.id = this.lastID;
      resolve($this);
    });
  });
}

const updateStatment = db.prepare('UPDATE client set name=$name, vat_number=$vat_number, address=$address, province=$province, locality=$locality, zipcode=$zipcode, country=$country WHERE id=$id');
Client.prototype.update = function() {
  return new Promise( (resolve, reject) => {
    updateStatment.run( this._binded(), function(err) {
        if (err) return reject(err);
        resolve();
    });
  });
}

const deleteStatement = db.prepare('DELETE FROM client WHERE id=$id');
Client.prototype.delete = function() {
  if ( !this.id ) throw( new Error('Unable to delete before insert!') );
  return new Promise( (resolve, reject) => {
    deleteStatement.run({ $id: this.id }, function(err) {
      if (err) return reject(err);
      resolve(true);
    });
  });
}

const getStatement = db.prepare('SELECT * FROM client WHERE id=$id');
Client.findOne = function(id) {
  return new Promise( (resolve, reject) => {
    getStatement.get( { $id: id }, function(err, row) {
      if (err) return reject(err);
      resolve(Client._inflate(row));
    });
  });
}

Client.prototype.merge = function(c) {
  Object.keys(c).forEach(k => {
    this[k] = c[k]
  })
}

Client._inflate = function(row) {
  return new Client(row);
}

Client.prototype._binded = function() {
  let attrs = {
    $name:        this.name,
    $vat_number:  this.vat_number,
    $address:     this.address,
    $province:    this.province,
    $locality:    this.locality,
    $zipcode:     this.zipcode,
    $country:     this.country
  };

  if ( this.id ) attrs.$id = this.id;

  return attrs;
}

Client.prototype.toJSON = function() {
  return {
    id:          this.id,
    name:        this.name,
    vat_number:  this.vat_number,
    address:     this.address,
    province:    this.province,
    locality:    this.locality,
    zipcode:     this.zipcode,
    country:     this.country
  }
}

export default Client;
