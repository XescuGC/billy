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
  status:    { is: 'rw', default: 'draft' },
  items:     { is: 'rw', default: [] }
});

Invoice.prototype.toJSON = function() {
  return {
    id:         this.id,
    client_id:  this.client_id,
    client:     this.client,
    emitted:    this.emitted.toString(),
    pit:        this.pit,
    vat:        this.vat,
    status:     this.status,
    items:      this.items,
  }
};

Invoice.prototype.save = function() {
  if ( this.id ) return this.update();
  return this.insert();
}

const insertStatement = db.prepare('INSERT INTO invoice (client_id, client, emitted, pit, vat, status) values ($client_id, $client, $emitted, $pit, $vat, $status)');
Invoice.prototype.insert = function() {
  let $this = this;
  return new Promise( (resolve, reject) => {
    let client = this.client;
    if ( this.client.id ) {
      this.client_id = this.client.id;
      delete this.client.id;
    }
    else {
      let newClient = new Client(this.client);
      client = newClient.save();
    }

    return Promise.resolve(client).then( client => {
      $this.client_id = client.id;
      insertStatement.run( this._binded(), function(err) {
        if (err) return reject(err);
        $this.id = this.lastID;
        resolve($this);
      });
    }).catch(err => reject(err) );
  });
}

const updateStatement = db.prepare('UPDATE invoice set client_id=$client_id, emitted=$emmitted WHERE id=$id');
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
  Object.keys(row).forEach(key => {
    if (!row[key]) delete row[key];
  })
  if (row.client) row.client = JSON.parse(row.client);

  return new Invoice(row);
}

Invoice.prototype._binded = function() {
  let attrs = {
    $emitted: Math.floor( this.emitted.getTime() / 1000 ), //TODO: formatear para SQL
    $pit:     this.pit,
    $vat:     this.vat,
    $status:  this.status,
  };
  if (this.client) {
    attrs['$client'] = JSON.stringify(this.client);
  }
  if (this.client_id) {
    attrs['$client_id'] = this.client_id;
  }
  if ( this.id ) attrs.$id = this.id;

  return attrs;
}

export default Invoice;
