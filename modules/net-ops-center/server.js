const WebSocket = require('ws');

const shared = require('./shared');
const config = shared.config;

// PORT defined by docker-compose.yml (see drones/client.js to verify
// 8000 is the default)
const node_env = process.env.NODE_ENV || 'development';
const PORT = config.netOpsCenter[node_env].port

const wss = new WebSocket.Server({ port: PORT});

wss.on('listening', ws => {
	console.log(`listening on ${ PORT }`);
});

wss.on('connection', ws => {
	ws.on('message', data => {
		// receive message and close socket
		// decode protobuf object 
		// upsert into DB
		console.log(data);
	});
});
