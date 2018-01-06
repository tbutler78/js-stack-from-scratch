// @flow

import { html } from 'common-tags';
import { APP_CONTAINER_CLASS, STATIC_PATH, WDS_PORT } from '../shared/config';
import { isProd } from '../shared/util';

const renderApp = (title: string) =>
  html`<!doctype html>
<html>
    <head>
        <title>${title}</title>
        <link rel="stylesheet" href="${STATIC_PATH}/css/style.css">
    </head>
    <body>
        <div class="${APP_CONTAINER_CLASS}"></div>
        <script src="${
          isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`
        }/js/bundle.js"></script>
        <h1>${title}</h1>
    </body>
</html>
`;

export default renderApp;
