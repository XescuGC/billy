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
    items:      this.items.map( item => item.toJSON() ),
  }
};

Invoice.prototype.save = function() {
  if ( this.id ) return this.update();
  return this.insert();
}

const insertStatement = db.prepare('INSERT INTO invoice (client_id, client, emitted, pit, vat, status) values ($client_id, $client, $emitted, $pit, $vat, $status)');
Invoice.prototype.insert = function() {
  let client = this.client;
  if ( this.client.id ) {
    this.client_id = this.client.id;
    delete this.client.id;
  }
  else {
    let newClient = new Client(this.client);
    client = newClient.save();
  }

  let $this = this;
  return Promise.resolve(client).then( client => {
    $this.client_id = client.id;
    return new Promise( (resolve, reject) => {
      insertStatement.run( this._binded(), function(err) {
        if (err) return reject(err);
        $this.id = this.lastID;
        resolve($this)
      });
    });
  }).then( invoice => {
    return Promise.all( invoice.items.map( item => {
      item.invoice_id = invoice.id;
      item = new Item(item);
      return item.save();
    })).then( items => {
      invoice.items = items;
      return invoice;
      resolve($this);
    });
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
    deleteStatement.run({ $id: this.id }, function(err) {
      if (err) return reject(err);
      resolve(true);
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
  row.emitted = new Date(row.emitted);
  // Prevent null values on the object
  Object.keys(row).forEach(key => {
    if (!row[key]) delete row[key];
  })
  if (row.client) row.client = JSON.parse(row.client);

  return Item.find({ where: { invoice_id: row.id } }).then( items => {
    row.items = items;
    return new Invoice(row);
  });

}

Invoice.prototype._binded = function() {
  let attrs = {
    $emitted: this.emitted.getTime(), //TODO: formatear para SQL
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
