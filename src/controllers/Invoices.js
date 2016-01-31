import express    from 'express';
import { Invoice } from '../models';

const invoices = express();

invoices.get('/', (req, res, next) => {
  Invoice.find().then(invoices => {
    res.json(invoices.map( i => i.toJSON() ))
  })
});

export default invoices;
