require('dotenv').config();
const express = require('express');
// const swaggerUi = require('swagger-ui-express');
// const sawggerJsDoc = require('swagger-jsdoc');
const errorHandler = require('./middleware/error.handling.middleware');
const notFoundHandler = require('./middleware/404.middleware');
const indexRouter = require('./routes');

const app = express();

const { env } = process;
const port = env.EXPRESS_PORT;

// const options = {
//   swaggerDefinition: {
//     openapi: '3.0.3',
//     info: {
//       title: '5주차 과제',
//       version: '1.0.0',
//       description: '5주차 과제 API 명세',
//     },
//     servers: [
//       {
//         url: 'http://localhost:3000',
//       },
//     ],
//   },
//   apis: ['../routes/*.js'],
// };

// const specs = sawggerJsDoc(options);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.get('/', (req, res) => {
  res.send(
    '<img src="https://4.bp.blogspot.com/--VHhhdaCid8/XdnHV0PMR_I/AAAAAAAmvb0/lTwe3aZyIRwYWZ6w78VIKj78oMbBkxXXgCLcBGAsYHQ/s1600/AW4084199_02.gif">',
  );
});

app.use('/', indexRouter);
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(port, () => { });
