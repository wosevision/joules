const PythonShell = require('python-shell');
const express = require('express');
const router = express.Router();

const routes = require('../common/routes.json');

let currentScript;
const cleanup = () => currentScript && currentScript.terminate && currentScript.terminate();
const monitor = (script, response) => {
  script.once('message', message => response.status(200).send({ message }));
  script.once('error', error => response.status(400).send(error));
};

routes.forEach(({ group, paths }) =>
  paths.map(path =>
    router.post(`/${path}`, (req, res) => {
      cleanup();
      const args = req.body.message;
      currentScript = PythonShell.run(
        `./scripts/${group}/${path}.py`,
        { args },
        err => (err && res.status(400).send(err)) || res.status(200).json({ success: true })
      );
    })
  )
);

module.exports = router;
