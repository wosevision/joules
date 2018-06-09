const path = require('path');
const https = require('https');
const express = require('express');
// const Gpio = require('onoff').Gpio;
const PythonShell = require('python-shell');

const router = express.Router();

const routes = require('../common/routes.json');

const mockResponse = (real, mock) => process.env.NODE_ENV === 'production' ? real() : () => setTimeout(mock, 1500);

let currentScript;
const cleanup = () => currentScript && currentScript.terminate && currentScript.terminate();
const monitor = (script, response) => {
  script.once('message', message => response.status(200).send({ message }));
  script.once('error', error => response.status(400).send(error));
};

const makeRoutes = (paths, group) =>
  paths.map(p => p.group
    ? makeRoutes(p.paths, group ? `${group}/${p.group}` : p.group)
    : router.post(`/${p}`, (req, res) => {
      const args = req.body.message;
      // response
      if (args && Array.isArray(args)) {
        mockResponse(
          () => {
            cleanup();
            currentScript = PythonShell.run(
              `${p}.py`,
              { args, scriptPath: path.resolve(path.join(__dirname, 'scripts', group)), mode: 'binary' },
              error => {
                if (error) {
                  console.error(error);
                  // res.status(500).send({ success: false, error });
                  process.exit(1);
                }
              }
            );
            res.status(200).json({ success: true });
          },
          // mock
          () =>
            res.status(200).json({
              success: true,
              mock: true,
              body: req.body
            })
        );
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
