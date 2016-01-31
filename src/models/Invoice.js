import Jsmoo from 'jsmoo';

import db from '../schema';
import Client from './Client';
import Item   from './Item';

class Invoice extends Jsmoo {}

Invoice.has({
  id:        { is: 'rw', isa: 'number' },
  client_id: { is: 'rw', isa: 'number' },
  _client:   { is: 'rw' },
  client_name: { is: 'rw' }
  client_vat_number
  client_address
  client_province
  client_locality
  client_zipcode
  client_country
  emitted:   { is: 'rw', default() { return new Date() } }
  pit:       { is: 'rw' },
  vat:       { is: 'rw' },
  status:    { is: 'rw', default() { return 'draft' } },

});

Invoice.prototype.toJSON = function() {
  return { client_id: this.client_id, emitted: this.emitted }
};

Invoice.prototype.client = function() {
  if ( !this.client_id ) return;

  if ( !this._client ) {
    this._client = Client.findOne(this.client_id);
  }

  return this._client;
}

Invoice.prototype.items = function() {
  //TODO
}

Invoice.prototype.save = function() {
  if ( this.id ) return this.insert();
  return this.update();
}

const insertStatement = db.prepare('INSERT INTO invoice (client_id, emitted) values ($client_id, $emitted)');
Invoice.prototype.insert = function() {
  let $this = this;
  return new Promise( (resolve, reject) => {
    db.run( insertStatemen, this._binded(), function(err) {
      if (err) return reject(err);
      $this.id = this.lastID;
      resolve();
    });
  });
}

const updateStatement = db.prepare('UPDATE invoice set client_id=$client_id, emitted=$emmited WHERE id=$id');
Invoice.prototype.update = function() {
  return new Promise( (resolve, reject) => {
    db.run( updateStatemen, this._binded(), function(err) {
        if (err) return reject(err);
        resolve();
    });
  });
}

const deleteStatement = db.prepare('DELETE FROM invoice WHERE id=$id');
Invoice.prototype.delete = function() {
  if ( !this.id ) throw( new Error('Unable to delete befor insert!') );
  return new Promise( (resolve, reject) => {
    db.run( deleteStatement, { $id: this.id }, function(err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

Invoice.find = function(q={}) {
  let {where, limit, page} = Object.assign({}, { page: 1 }, q);
  let query = 'SELECT * FROM invoice';
  if ( where ) query += ` WHERE ${where}`;
  if ( limit ) query += ` LIMIT ${page * limit}, ${limit}`;
  return new Promise( (resolve, reject) => {
    db.all( query, function(err, rows) {
      if (err) return reject(err);
      resolve( rows.map(row => Invoice._inflate(row)) );
    })
  })
}

const getStatement = db.prepare('SELECT * FROM invoice WHERE id=$id');
Invoice.findOne = function(id) {
  getStatement.get( { $id: id }, function(err, row) {
    if (err) return reject(err);
    return Invoice._inflate(row);
  });
}

Invoice._inflate = function(row) {
  //row.emitted = new Date(row.emmited * 1000);
  //row.emitted = new Date(row.emmited);
  let invoice = new Invoice(row);
  return invoice;
}

Invoice.prototype._binded = function() {
  let attrs = {
    $client_id: this.client_id,
    $emmited:   Math.floor( this.emmited.getTime() / 1000 ), //TODO: formatear para SQL
  };
  if ( this.id ) attrs.$id = this.id;

  return attrs;
}

export default Invoice;
