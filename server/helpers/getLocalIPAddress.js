const os = require('os');

function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const interfaceData = interfaces[interfaceName];
    for (const interfaceInfo of interfaceData) {
      if (!interfaceInfo.internal && interfaceInfo.family === 'IPv4') {
        return interfaceInfo.address;
      }
    }
  }
  return null; // Return null if no IPv4 address found
}
module.exports = getLocalIPAddress;