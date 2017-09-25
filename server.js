var app = require('./server-config.js')

var port = process.env.PORT || 3000;

app.listen(port);

console.log('server now listening on port ' + port);
