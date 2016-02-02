import express    from 'express'

const clients = express();

clients.get('/', (req, res, next) => {
  next()
});

export default clients;
