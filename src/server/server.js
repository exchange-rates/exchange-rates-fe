import express from 'express';
import compression from 'compression';
import config from '../config';
import markup from './routes/markup';

const { port } = config;

const app = express();

app.use(compression());

app.use(express.static('dist'));

app.use(markup);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
