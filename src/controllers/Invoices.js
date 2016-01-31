import express    from 'express';
import { Invoice } from '../models';

const invoices = express();

invoices.get('/', (req, res, next) => {
  res.json([
      { name: 'Invoice1' },
      { name: 'Invoice2' },
    ])
});

export default invoices;
