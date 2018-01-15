const path = require('path');
const swagger = require('feathers-swagger');

module.exports = function (app) {

  app.configure(swagger({
    docsPath: '/swagger',
    uiIndex: path.join(__dirname, 'swagger.html'),
    info: {
      title: 'Admin Portal REST API',
      description: 'This is the API documentation and can also be used to test the REST server by calling single services.'
    }
  }))
};
