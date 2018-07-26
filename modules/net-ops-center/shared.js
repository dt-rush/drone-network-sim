if (process.env.NODE_ENV === 'production') {
  // path will be provided by docker-compose volume
  module.exports = config = require('/opt/lib/resinio/shared');
} else {
  module.exports = config = require('../shared'); 
}
