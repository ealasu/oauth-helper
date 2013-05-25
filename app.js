
var events = require('events'),
    express = require('express');

var app = express();
app.use(express.logger());

var eventEmitter = new events.EventEmitter();

app.get('/auth', function(req, res) {
  var key = req.query.oauth_token;
  if (!key) {
    res.status(400).send('must specify oauth_token');
  } else {
    eventEmitter.emit(key, req.query);
    res.send('sent oauth params');
  }
});

app.get('/waitforauth', function(req, res) {
  var key = req.query.oauth_token;
  if (!key) {
    res.status(400).send('must specify oauth_token');
  } else {
    eventEmitter.once(key, function(query) {
      console.log('event: '+key);
      console.log('query: '+query);
      res.send(query);
    });
  }
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

