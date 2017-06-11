import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './App';

const rootElement = window.document.getElementById('root');

if (rootElement) {
  render(
    <App />,
    rootElement,
  );
}
