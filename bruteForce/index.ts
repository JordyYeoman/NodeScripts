import wifi from 'node-wifi';

const ssidToConnectTo = 'TestNetwork-2B';
let hasSuccessfullyConnected = false;
let totalAttempts = 1;
let iteration = 9999;
let currPasswordAttempt = 'test';

console.log('BruteForce Starting on WiFi ssid:', ssidToConnectTo);

wifi.init({
  iface: null,
});

// Scan networks
wifi.scan((error, networks) => {
  if (error) {
    console.log(error);
  } else {
    console.log(networks);
  }
});

// const handleExit = () => {
//   // @ts-ignore
//   process.exit(0);
// };

// const attemptConnection = () => {
//   console.log('Total Attempts: ', totalAttempts);
//   console.log('Iteration: ', iteration);
//   totalAttempts++;

//   // Attempt a connection
//   wifi.connect({ ssid: ssidToConnectTo, password: currPasswordAttempt }, () => {
//     console.log('Attempt tried');
//   });

//   // List the current wifi connections
//   let messageReturnedYet = false;
//   wifi.getCurrentConnections((error, currentConnections) => {
//     console.log('Houston, we have a message: ');
//     messageReturnedYet = true;

//     if (error) {
//       console.log(error);
//       handleExit();
//     } else {
//       console.log('currentConnections: ', currentConnections);

//       const hasRSNSecurity = currentConnections.some((conn) =>
//         conn.security.includes('RSN')
//       );

//       if (currentConnections.length > 0 && hasRSNSecurity) {
//         console.log('Connection established!!');
//         console.log('Password attempted: ', currPasswordAttempt);
//         hasSuccessfullyConnected = true;
//         handleExit();
//         return;
//       }
//     }
//   });

//   while (!messageReturnedYet) {
//     return;
//   }

//   iteration--;
//   attemptConnection();
// };

// attemptConnection();
