const WebSocket = require('ws');

// basic config
const shared = require('./shared');
const config = shared.config;

// DB and protobuf models
const db = shared.db;
const model = shared.model;
const DroneORM  = model.drone;
const DronePB = model.drone.pb;
const LatLonPB = model.drone.pb.LatLon;

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
		const bytes = Array.prototype.slice.call(data, 0);
		ws.close();
		// decode protobuf object 
		const decoded = DronePB.toObject(DronePB.decode(bytes));
		console.log(`received update for ${decoded.id}`);
		// upsert into DB
		db.upsertOne('drones', {id: decoded.id}, decoded)
			.then(() => {
				console.log(`saved updated ${decoded.id}`);
			})
			.catch(err => {
				console.error(err.message);
			});
	});
});
