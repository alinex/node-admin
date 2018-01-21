const path = require('path');
const swagger = require('feathers-swagger');

const pjson = require('../../../package.json');

module.exports = function (app) {

  app.configure(swagger({
    info: {
      title: 'Admin Portal REST API',
      description: 'This is the API documentation and can also be used to test the REST server by calling single services.',
      version: pjson.version // get version from package.json
    },
    host: 'http://localhost:3030',
    docsPath: '/swagger',
    uiIndex: path.join(__dirname, 'swagger.html'),
    // authentication
    components: {
      securitySchemes: {
        bearerAuth: { // arbitrary name for the security scheme
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT' // optional, arbitrary value for documentation purposes
        }
      }
    },
    security: [
      {
        bearerAuth: [] // use the same name as above
      }
    ]
  }));
};
