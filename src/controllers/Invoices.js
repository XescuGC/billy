import express    from 'express';
import { Invoice } from '../models';

const invoices = express();

invoices.get('/', (req, res, next) => {
  Invoice.find().then(invoices => {
    const items = invoices.map( i => i.toJSON() );
    if (req.xhr) return res.status(200).json(items);
    res.locals.state.invoices = { items, invoice: { items: [] } };
    next();
  }).catch(err => {
    console.trace(err);
    res.status(422).json({ error: err.toString() });
  })
});

invoices.post('/new', (req, res, next) => {
  let invoice = new Invoice(req.body);
  invoice.save().then( invoice => {
    res.status(201).json({ invoice });
  }).catch( err => {
    console.trace(err);
    res.status(422).json({ error: err.toString() });
  });
})

invoices.use('/:id', (req, res, next) => {
  Invoice.findOne(req.params.id).then(invoice => {
    if ( !invoice ) throw(`Missing invoice ${req.params.id}`);
    res.locals.invoice = invoice;
    next();
  }).catch(err => {
    console.trace(err);
    res.status(422).json({ error: err.toString() });
  })
});

invoices.get('/:id', (req, res, next) => {
  if (req.xhr) return res.status(200).json( res.locals.invoice.toJSON() );
  res.locals.state.invoices = { invoice: res.locals.invoice.toJSON(), items: [] };
  next();
});

invoices.get('/:id/preview', (req, res, next) => {
  if (req.xhr) return res.status(200).json( res.locals.invoice.toJSON() );
  res.locals.state.invoices = { invoice: res.locals.invoice.toJSON(), items: [] };
  next();
});

invoices.delete('/:id', (req, res, next) => {
  res.locals.invoice.delete().then( ok => res.status(200).json({}) ).catch( err => {
    console.trace(err);
    res.status(422).json({ error: err.toString() });
  });
});

export default invoices;
