module.exports = {
  brand: 'drone-net',
  city: {
    name: 'Montreal',
    lat: 45.5017,
    lon: -73.5673,
  },
  dashboard: {
    'production': {
      port: process.env.DASHBOARD_PORT,
    },
    'development': {
      port: '8080',
    }
  },
  db: {
    'production': {
      user: process.env.MONGO_INITDB_ROOT_USERNAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      host: process.env.DB_HOST,
      port: '27017',
      database: process.env.MONGO_DATABASE,
    },
    'development': {
      host: 'localhost',
      port: '27017',
      database: 'drone-net',
    }, 
  },
  netOpsCenter: {
    'production': {
      host: process.env.NET_OPS_CENTER_HOST,
      port: process.env.NET_OPS_CENTER_PORT,
    },
    'development': {
      host: 'localhost',
      port: '8000',
    }
  }
}
