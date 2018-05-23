const path = require('path');
const express = require('express');
const Gpio = require('onoff').Gpio;
const PythonShell = require('python-shell');

const router = express.Router();

const routes = require('../common/routes.json');

const mockResponse = (real, mock) => Gpio.accessible ? real() : () => setTimeout(mock, 1500);

let currentScript;
const cleanup = () => currentScript && currentScript.terminate && currentScript.terminate();
const monitor = (script, response) => {
  script.once('message', message => response.status(200).send({ message }));
  script.once('error', error => response.status(400).send(error));
};

routes.forEach(({ group, paths }) =>
  paths.map(route =>
    router.post(`/${route}`, (req, res) => {
      const args = req.body.message;
      console.log(args);
      // response
      if (args && Array.isArray(args)) {
        mockResponse(
          () => {
            cleanup();
            currentScript = PythonShell.run(
              `${route}.py`,
              { args, scriptPath: path.resolve(path.join(__dirname, 'scripts', group)), mode: 'binary' },
              error => {
                if (error) {
                  console.error(error);
                  res.status(500).send({ success: false, error })
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
  )
);

module.exports = router;
