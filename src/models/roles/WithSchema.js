import { Role } from 'jsmoo';
import db       from '../../schema';

class WithSchema extends Role {
  static find(q={}) {
    let {where, limit, page} = Object.assign({}, { page: 1 }, q);
    let query = `SELECT * FROM ${this.name}`;
    if ( where ) {
      query += ` WHERE ${ Object.keys(where).map( k => k + "='" + where[k] + "'" ).join(' ') }`;
    }
    if ( limit ) query += ` LIMIT ${page * limit}, ${limit}`;
    let $this = this;
    return new Promise( (resolve, reject) => {
      db.all( query, function(err, rows) {
        if (err) return reject(err);
        Promise.all( rows.map(row => $this._inflate(row)) ).then( items => resolve(items) );
      })
    })
  }
}

export default WithSchema;
