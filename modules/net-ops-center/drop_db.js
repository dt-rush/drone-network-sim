const shared = require('./shared');
const db = shared.db;
const node_env = process.env.NODE_ENV || 'development';
const { database } = shared.config.db[node_env];

db.connect().then(conn => {
	conn.db(database).dropDatabase()
		.then(() => console.log(`dropped ${database}`))
		.then(() => conn.close());
});
