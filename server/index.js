const Hapi = require('hapi');
// const webpack = require('hapi-webpack');
const inert = require('inert');
const webpack = require('webpack');
const options = require('../webpack.config');

const server = Hapi.Server({
  port: 3000,
  host: 'localhost'
});

const build = () => new Promise(
  (resolve, reject) => webpack(options).run(function (err, stats) {
    process.stdout.write(stats.toString() + '\n');
    if (err) return reject(err);
    resolve();
}))

const start = async () => {
  await build();
  await server.register(inert);

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'client',
        index: true
      }
    }
  });

  await server.start();

  console.log('server is running at', server.info.uri);
}

start();
