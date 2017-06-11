import express from 'express';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Html from '../templates/Html';

const router = express.Router();

router.get('/', (req, res) => {
  const markup = renderToStaticMarkup(React.createElement(Html, {}));
  res.send(`<!Doctype html>${markup}`);
});

export default router;
