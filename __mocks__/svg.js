const React = require('react');

module.exports = {
  __esModule: true,
  default: 'SvgrURL',
  ReactComponent: (props) =>
    React.createElement('svg', { ...props, 'data-testid': 'svg-mock' }),
};
