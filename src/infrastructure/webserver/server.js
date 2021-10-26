'use strict';

const Hapi = require('@hapi/hapi');
const Good = require('@hapi/good');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Blipp = require('blipp');
const HapiSwagger = require('hapi-swagger');
const HapiCron = require('hapi-cron');
const Package = require('../../../package');
const { EVERY_HOUR, NAME, TIME_ZONE } = require('../config/constants').CRON_JOB;
const createServer = async () => {

  // Create a server with a host and port
  const server = Hapi.server({
    port: process.env.PORT || 8000
  });

  // Register vendors plugins
   await server.register(
    [
      Blipp,
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: {
          info: {
            title: 'Test API Documentation',
            version: Package.version,
          },
        }
      },
      {
        plugin: Good,
        options: {
          ops: {
            interval: 1000 * 60
          },
          reporters: {
            myConsoleReporter: [
              {
                module: '@hapi/good-squeeze',
                name: 'Squeeze',
                args: [{ ops: '*', log: '*', error: '*', response: '*' }]
              },
              {
                module: '@hapi/good-console'
              },
              'stdout'
            ]
          }
        },
      },
      {
        plugin: HapiCron,
        options: {
          jobs: [
            {
              name: NAME,
              time: EVERY_HOUR,
              timezone: TIME_ZONE,
              request: {
                method: 'PUT',
                url: '/getBinanceAvgPrice'
              },
              onComplete: (res) => {

                const updatedPairs = res;
                for (const updated of updatedPairs) {
                  let loggingResponse = {
                    id: updated.id,
                    message: updated.symbol + ' was just updated whith the lastest average: ' + updated.version.slice(-1)[0].averagePrice,
                  }
                  console.log(loggingResponse);
                }

              }
            }
          ]
        }
      }
    ]);

  // Register custom plugins
  await server.register([
    require('../../interfaces/routes/currency'),
  ]);

  server.app.serviceLocator = require('../config/service-locator');

  return server;
};

module.exports = createServer;