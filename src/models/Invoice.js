import Jsmoo from 'jsmoo';

import db         from '../schema';
import Client     from './Client';
import Item       from './Item';
import WithSchema from './roles/WithSchema';

class Invoice extends Jsmoo {}

Invoice.with(WithSchema);

Invoice.has({
  id:        { is: 'rw', isa: 'number' },
  client_id: { is: 'rw', isa: 'number' },
  client:    { is: 'rw', isa: 'Object' },
  emitted:   { is: 'rw', default() { return new Date() } },
  pit:       { is: 'rw' },
  vat:       { is: 'rw' },
  status:    { is: 'rw', default() { return 'draft' } },
});

Invoice.prototype.toJSON = function() {
  return { client_id: this.client_id, emitted: this.emitted.toString(), id: this.id }
};

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
    db.run( insertStatement, this._binded(), function(err) {
      if (err) return reject(err);
      $this.id = this.lastID;
      resolve();
    });
  });
}

const updateStatement = db.prepare('UPDATE invoice set client_id=$client_id, emitted=$emmited WHERE id=$id');
Invoice.prototype.update = function() {
  return new Promise( (resolve, reject) => {
    db.run( updateStatement, this._binded(), function(err) {
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

const getStatement = db.prepare('SELECT * FROM invoice WHERE id=$id');
Invoice.findOne = function(id) {
  return new Promise( (resolve, reject) => {
    getStatement.get( { $id: id }, function(err, row) {
      if (err) return reject(err);
      resolve(Invoice._inflate(row));
    });
  });
}

Invoice._inflate = function(row) {
  // TODO: Build de date
  row.emitted = new Date(row.emitted);
  if (row.client) row.client = JSON.parse(row.client);
  return new Invoice(row);
}

Invoice.prototype._binded = function() {
  let attrs = {
    $emmited:   Math.floor( this.emmited.getTime() / 1000 ), //TODO: formatear para SQL
  };
  if (attrs.client) {
    attrs['$client'] = JSON.stringify(this.client);
    attrs['$client_id'] = this.client_id;
  } else if (attrs.client_id) {
    attrs['$client_id'] = this.client_id;
  }
  if ( this.id ) attrs.$id = this.id;

  return attrs;
}

export default Invoice;
