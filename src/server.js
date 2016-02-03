import express     from 'express'
import morgan      from 'morgan';
import bodyParser  from 'body-parser';
import compression from 'compression';
import * as Controllers from './controllers';
import * as Utils from './utils';

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());

app.use(express.static(`${__dirname}/..`));

// Set the initial state
app.use((req, res, next) => {
  const slug = req.path.split('/')[1] || 'invoices';
  res.locals.state = {
    sidebar: [
      { slug: 'invoices', name: 'Invoices', active: slug === 'invoices' ? true : false },
      { slug: 'clients',  name: 'Clients',  active: slug === 'clients' ? true : false },
    ]
  };
  next();
});

app.use('/', Controllers.Invoices);
app.use('/invoices', Controllers.Invoices);
app.use('/clients', Controllers.Clients);
app.use('/invoice_lines', Controllers.InvoiceLines);
app.use(Utils.renderReact())

// Handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

const server = app.listen((process.env.PORT || 5000), () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Billy is ready to invoice at http://${host}:${port}`);
})
