var ncp = require('ncp').ncp;

ncp.limit = 16;

console.log('Patching node_modules...');
ncp('./patches', './', function (err) {
    if (err) {
        return console.error(err);
    }
    console.log('...done!');
});