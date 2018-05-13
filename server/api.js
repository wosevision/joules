const path = require('path');
const express = require('express');
const Gpio = require('onoff').Gpio;
const PythonShell = require('python-shell');

const router = express.Router();

const routes = require('../common/routes.json');

const mockResponse = (real, mock) => Gpio.accessible ? real() : mock();

let currentScript;
const cleanup = () => currentScript && currentScript.terminate && currentScript.terminate();
const monitor = (script, response) => {
  script.once('message', message => response.status(200).send({ message }));
  script.once('error', error => response.status(400).send(error));
};

routes.forEach(({ group, paths }) =>
  paths.map(route =>
    router.post(`/${route}`, (req, res) => {
      mockResponse(() => {
        cleanup();
        const args = req.body.message;
        currentScript = PythonShell.run(
          `${route}.py`,
          { args, scriptPath: path.resolve(path.join(__dirname, 'scripts', group)), mode: 'binary' },
          err => {
            if (err) {
              console.error(err);
              res.status(400).send(err)
            }
            res.status(200).json({ success: true });
          }
        );
      }, () => setTimeout(() => res.status(200).json({ success: true, mock: true }), 1500));
    })
  )
);

module.exports = router;
