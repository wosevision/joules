const PythonShell = require('python-shell');
const Gpio = require('onoff').Gpio;
const sensor = new Gpio(4, 'in', 'rising', { debounceTimeout: 10 });

let methodInUse = false;
sensor.watch((err, value) => {
  if (err) {
    throw err;
  }
  if (!methodInUse && value === 1) {
    methodInUse = true;
    const args = { method: 'theaterChaseRainbow', clear: '' };
    PythonShell.run(
      'method.py',
      { args, scriptPath: path.resolve(path.join(__dirname, 'scripts', 'neopixel')), mode: 'binary' },
      err => err && console.error(err)
    );
    setTimeout(() => methodInUse = false, 5000);
  }
});

process.on('SIGINT', function () {
  sensor.unexport();
});
