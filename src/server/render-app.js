// @flow

import { STATIC_PATH } from '../shared/config';
import { html } from 'common-tags';

const renderApp = (title: string) =>
  html`<!doctype html>
<html>
    <head>
        <title>${title}</title>
        <link rel="stylesheet" href="${STATIC_PATH}/css/style.css">
    </head>
    <body>
        <h1>${title}</h1>
    </body>
</html>
`;

export default renderApp;
