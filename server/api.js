const path = require('path');
const https = require('https');
const express = require('express');
const ip = require('ip');
const PythonShell = require('python-shell');

const router = express.Router();

const routes = require('../common/routes.json');
const scriptPath = path.resolve(path.join(__dirname, 'scripts'));

let currentScript = PythonShell.run(
  `scrollphat/text-display/single-line.py`,
  { args: [ip.address()], scriptPath, mode: 'binary' },
  handleError
);

function cleanup() {
  currentScript && currentScript.terminate && currentScript.terminate();
}
function monitor(script, response) {
  script.once('message', message => response.status(200).send({ message }));
  script.once('error', error => response.status(400).send(error));
};
function handleError(error) {
  if (error) {
    console.error(error);
    process.exit(1);
  }
}

const makeRoutes = (paths, group) =>
  paths.map(p => p.group
    ? makeRoutes(p.paths, group ? `${group}/${p.group}` : p.group)
    : router.post(`/${p}`, (req, res) => {
      const args = req.body.message;
      // response
      if (args && Array.isArray(args)) {
        cleanup();
        currentScript = PythonShell.run(
          `${p}.py`,
          { args, scriptPath: path.join(scriptPath, group), mode: 'binary' },
          error => {
            if (error) {
              console.error(error);
              process.exit(1);
            }
          }
        );
        res.status(200).json({ success: true });
      } else {
        res.status(400).send({ success: false, message: 'invalid arguments'})
      }
      // end response
    })
  );

makeRoutes(routes);

router.get(`/hashtags`, (req, res) => {
  https.get(
    `https://twitter.com/i/search/typeahead.json?count=20&filters=true&q=%23${req.query.q}&result_type=hashtags&src=COMPOSE`,
    response => response.pipe(res)
  )
});

module.exports = router;
