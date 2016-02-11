import Jsmoo      from 'jsmoo';
import WithSchema from './roles/WithSchema';

class Client extends Jsmoo {}

Client.with(WithSchema);

Client.has({
  name:       { is: 'rw', isa: 'string' },
  vat_number: { is: 'rw', isa: 'string' },
  address:    { is: 'rw', isa: 'string' },
  province:   { is: 'rw', isa: 'string' },
  locality:   { is: 'rw', isa: 'string' },
  zipcode:    { is: 'rw', isa: 'string' },
  country:    { is: 'rw', isa: 'string' },
});

Client._inflate = function(row) {
  return new Client(row);
}

Client.prototype.toJSON = function() {
  return {
    name: this.name,
    id: this.id,
  }
}

export default Client;
