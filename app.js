
var events = require('events'),
    express = require('express');

var app = express();
app.use(express.logger());

var eventEmitter = new events.EventEmitter();

app.get('/auth', function(req, res) {
  eventEmitter.emit(req.query.oauth_token, req.query);
  res.send('sent oauth params');
});

app.get('/waitforauth', function(req, res) {
  eventEmitter.once(req.query.oauth_token, function(query) {
    console.log('event: '+req.query.oauth_token);
    console.log('query: '+query);
    res.send(query);
  });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

