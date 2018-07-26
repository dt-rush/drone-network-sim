module.exports = {
  city: {
    name: 'Montreal',
    lat: 45.5017,
    lon: -73.5673,
  },
  db: {
    'production': {
      user: 'dtrush',
      password: 'dtrush',
      host: process.env.DB_HOST || 'drone-network-db',
      port: '27017',
      database: 'admin',
    },
    'development': {
      host: 'localhost',
      port: '27017',
      database: 'drone-net',
    }, 
  },
  netOpsCenter: {
    'production': {
      host: process.env.NET_OPS_CENTER_HOST || 'drone-network-net-ops-center',
      port: process.env.NET_OPS_CENTER_POST || '8000',
    },
    'development': {
      host: 'localhost',
      port: '8000',
    }
  }
}
