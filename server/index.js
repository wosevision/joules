const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const api = require('./api');

const app = express();

const PUBLIC_DIR = joinResolve(path, __dirname, '../dist/joules');
const INDEX_HTML = joinResolve(path, PUBLIC_DIR, 'index.html');
const DEFAULT_PORT = 4201;

// 3rd party middleware
app.use(cors(), bodyParser.json(), morgan('dev'));

app.use('/api', api);
app.use('/', express.static(PUBLIC_DIR));
app.get('/*', (req, res) => res.sendFile(INDEX_HTML));

const server = app.listen(process.env.PORT || DEFAULT_PORT, () =>
  console.log(`Started on port ${process.env.PORT || DEFAULT_PORT}`)
);

const exit = () => console.log('Clean shutdown!') && process.exit(0);
const shutdown = () => server.close(exit);

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

exports = module.exports = app;

function joinResolve(pathFn, ...parts) {
  return pathFn.resolve(pathFn.join(...parts));
}
