import express     from 'express'
import morgan      from 'morgan';
import exphbs      from 'express-handlebars';
import compression from 'compression';
import * as controllers from './controllers';

const app = express();

app.use(morgan('dev'));

app.engine('.hbs', exphbs({
  defaultLayout:  'default',
  extname:        '.hbs',
  layoutsDir:     __dirname + '/views/layouts/',
  partialsDir:    __dirname + '/views/partials/',
}));

app.set('view engine', '.hbs');

app.set('views', __dirname + '/views');

app.use(compression());

app.use(express.static(`${__dirname}/..`));

app.get('/', (req, res, next) => {
  res.render('home/index')
});

app.use('/invoices', controllers.Invoice);
app.use('/clients', controllers.Client);
app.use('/invoice_lines', controllers.InvoiceLine);

// Handle errors
app.use( (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

const server = app.listen((process.env.PORT || 5000), () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
})
