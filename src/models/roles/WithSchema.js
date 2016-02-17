import { Role } from 'jsmoo';
import db       from '../../schema';

class WithSchema extends Role {
  static find(q={}) {
    let {where, limit, page} = Object.assign({}, { page: 1 }, q);
    let query = `SELECT * FROM ${this.name}`;
    if ( where ) query += ` WHERE ${where}`;
    if ( limit ) query += ` LIMIT ${page * limit}, ${limit}`;
    let $this = this;
    return new Promise( (resolve, reject) => {
      db.all( query, function(err, rows) {
        if (err) return reject(err);
        const clients = rows.map(row => $this._inflate(row));
        console.log(clients.map( c => c._jsmoo_ ));
        resolve( clients );
      })
    })
  }
}

export default WithSchema;
