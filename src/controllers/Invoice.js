import express    from 'express'

const invoice = express();

invoice.get('/', (req, res, next) => {
  res.json([
      { name: 'Invoice1' },
      { name: 'Invoice2' },
    ])
});

export default invoice;
