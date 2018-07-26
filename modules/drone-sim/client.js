const shared = require('./shared');
const config = shared.config;
const node_env = process.env.NODE_ENV || 'development';
const NET_OPS_CENTER_HOST = config.netOpsCenter[node_env].host;
const NET_OPS_CENTER_PORT = config.netOpsCenter[node_env].port;
const url = `ws://${NET_OPS_CENTER_HOST}:${NET_OPS_CENTER_PORT}/`;

const simulator = require('./simulator.js');

simulator.runSim(url);
