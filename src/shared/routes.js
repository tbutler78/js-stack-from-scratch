// @flow

export const helloEndpointRoute = (num: ?number) =>
  `/ajax/hello/${num || ':num'}`;
