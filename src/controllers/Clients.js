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

clients.use('/:id', (req, res, next) => {
  if ( res.locals.done ) return next();
  Client.findOne(req.params.id).then(client => {
    if ( !client ) throw(`Missing invoice ${req.params.id}`);
    res.locals.client = client;
    next();
  }).catch(err => {
    console.trace(err);
    res.status(422).json({ error: err.toString() });
  })
});

clients.delete('/:id', (req, res, next) => {
  res.locals.client.delete().then( ok => res.status(200).json({})).catch( err => {
    console.trace(err);
    res.status(422).json({ error: err.toString() });
  })
});

clients.put('/:id', (req, res, next) => {
  res.locals.client.merge(req.body)
  res.locals.client.update().then( ok => res.status(200).json(res.locals.client.toJSON())).catch( err => {
    console.trace(err);
    res.status(422).json({ error: err.toString() });
  })
});

export default clients;
