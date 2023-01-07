require('dotenv').config();
const express = require('express');
const indexRouter = require('./routes');
const app = express();
const env = process.env;
const port = env.EXPRESS_PORT;

const { swaggerUi, specs } = require('./src/swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json());
app.get('/', (req, res) => {
  res.send(
    '<img src="https://4.bp.blogspot.com/--VHhhdaCid8/XdnHV0PMR_I/AAAAAAAmvb0/lTwe3aZyIRwYWZ6w78VIKj78oMbBkxXXgCLcBGAsYHQ/s1600/AW4084199_02.gif">'
  );
});

app.use('/', indexRouter);

app.listen(port, () => {});
