const path = require('path');
const express = require('express');

// define the app config
const shared = require('./shared');
const config = shared.config;
const node_env = process.env.NODE_ENV || 'development';
const port = config.dashboard[node_env].port;
const app = express();

// add API
app.use('/api', require('./api.js'));

// generic error handler
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// add static file handler for client/build if in production 
// (in dev, `react-scripts start` handles serving the react app dynamically,
// while this script, server.js, only serves the API)
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
	});
} 

// serve on the port
app.listen(port, () => console.log(`Listening on port ${port}`));
