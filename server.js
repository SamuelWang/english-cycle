const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware");

const app = require('./server/app');
const config = require('./webpack.config.js');
const compiler = webpack(config);
const port = process.env.PORT || 3000;
const devMode = process.env.NODE_ENV !== 'production';

if (devMode) {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.listen(port, function () {
  console.log('App listening on port 3000!\n');
});