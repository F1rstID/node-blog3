const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const options = {
  swaggerDefinition: {
    openapi: '3.0.3',
    info: {
      title: '5주차 과제',
      version: '1.0.0',
      description: '5주차 과제 API 명세',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['../routes/*.js'],
};

const specs = swaggerJSDoc(options);

module.exports = { swaggerUi, specs };
