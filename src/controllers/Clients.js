import express    from 'express'
import { Client } from '../models';

const clients = express();

clients.get('/', (req, res, next) => {
  Client.find().then(clients => {
    const items = clients.map( i => i.toJSON() );
    if (req.xhr) return res.status(200).json(items);
    res.locals.state.clients = { items };
    next();
  }).catch(err => {
    console.trace(err.stack);
    res.status(422).json({ error: err.toString() })
  })
});

clients.post('/new', (req, res, next) => {
  let client = new Client(req.body);
  client.save().then( dbClient => {
    res.status(201).json(client.toJSON());
  }).catch(err => {
    console.error(err.stack);
    res.status(422).json({ error: err.toString() })
  });
});

export default clients;
