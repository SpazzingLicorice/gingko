var app = require('./server-config.js');

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log('Server now listening on port ' + PORT);
});
