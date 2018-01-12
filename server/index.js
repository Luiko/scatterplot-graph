const Hapi = require('hapi');
const inert = require('inert');
const webpack = require('webpack');
const options = require('../webpack.config.js');

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
  if (process.env.NODE_ENV === 'development')
    await build();
  await server.register(inert);

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'docs',
        index: true
      }
    }
  });

  await server.start();

  console.log('server is running at', server.info.uri);
}

start();
