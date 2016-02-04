import Jsmoo from 'jsmoo';
import db         from '../schema';
import Invoice    from './Invoice';
import WithSchema from './roles/WithSchema';

class Item extends Jsmoo {}
Item.with(WithSchema);

Item.has({
  id:          { is: 'rw', isa: 'number' },
  invoice_id:  { is: 'rw', isa: 'number' },
  description: { is: 'rw', isa: 'string' },
  price:       { is: 'rw', isa: 'number' },
});

Item.prototype.toJSON = function() {
  return { id: this.id, invoice_id: this.invoice_id, description: this.description, price: this.price }
};

// This should be a lazy attribute (and need generator!)
Item.prototype.invoice = function() { Invoice.findOne(this.invoice_id) }

Item.prototype.save = function() {
  if ( this.id ) return this.insert();
  return this.update();
}

const insertStatement = db.prepare('INSERT INTO item (invoice_id, description, price) values ($invoice_id, $description, $price)');
Item.prototype.insert = function() {
  let $this = this;
  return new Promise( (resolve, reject) => {
    db.run( insertStatemen, this._binded(), function(err) {
      if (err) return reject(err);
      $this.id = this.lastID;
      resolve();
    });
  });
}

const updateStatement = db.prepare('UPDATE item set invoice_id=$invoice_id, description=$description, price=$price WHERE id=$id');
Item.prototype.update = function() {
  return new Promise( (resolve, reject) => {
    db.run( updateStatement, this._binded(), function(err) {
        if (err) return reject(err);
        resolve();
    });
  });
}

const deleteStatement = db.prepare('DELETE FROM item WHERE id=$id');
Item.prototype.delete = function() {
  if ( !this.id ) throw( new Error('Unable to delete befor insert!') );
  return new Promise( (resolve, reject) => {
    db.run( deleteStatement, { $id: this.id }, function(err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

const getStatement = db.prepare('SELECT * FROM item WHERE id=$id');
Item.findOne = function(id) {
  return new Promise( (resolve, reject) => {
    getStatement.get( { $id: id }, function(err, row) {
      if (err) return reject(err);
      resolve(Item._inflate(row));
    });
  });
}

Item._inflate = function(row) { return new Item(row) }

Item.prototype._binded = function() {
  let attrs = {
    $invoice_id:  this.invoice_id,
    $description: this.description,
    $price:       this.price
  };

  if ( this.id ) attrs.$id = this.id;

  return attrs;
}

export default Item;
