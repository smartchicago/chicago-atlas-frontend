// server.js
var express = require('express');
var path = require('path');
var compression = require('compression');

var app = express();

app.use(compression());

// serve our static stuff like CSS and JS and cache forever
// NOTE: make sure to implement cache-busting strategy for static data and mocks or exclude data/ from cache
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '365 days' }));

// send all requests to index.html so browserHistory in React Router works
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT);
});
