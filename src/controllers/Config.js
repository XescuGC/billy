import express    from 'express'
import { Config } from '../models';

const config = express();

config.get('/', getAll);

config.post('/', (req, res, next) => {
  Promise.all(req.body.configs.map(config => Config.set(config.key, config.value))).then(() => {
    getAll(req,res,next);
  }).catch(err => {
    console.trace(err.stack);
    res.status(422).json({ error: err.toString() })
  });
});

function getAll(req, res, next) {
  return Config.getAll().then(configModel => {
    if (req.xhr) return res.status(200).json(configModel);
    res.locals.state.config = configModel;
    next();
  }).catch(err => {
    console.trace(err.stack);
    res.status(422).json({ error: err.toString() })
  });
}

export default config;
