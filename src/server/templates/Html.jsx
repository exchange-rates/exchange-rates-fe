import React from 'react';
import { getServerConfigs } from '../../config';

export default function Html() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        <div id="root" />
        <script dangerouslySetInnerHTML={{ __html: `window.__client_configs__ = ${JSON.stringify(getServerConfigs())}` }} />
        <script src="/assets/main.js" />
      </body>
    </html>
  );
}
