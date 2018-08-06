'use strict';

module.exports = {
  PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://leoveres:dev123@ds115022.mlab.com:15022/spaced-rep-database',
  TEST_DATABASE_URL:process.env.TEST_DATABASE_URL ||'mongodb://leoveres:<dev123@ds115022.mlab.com:15022/spaced-rep-test-database',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/spaced-rep-app',
  JWT_SECRET :process.env.JWT_SECRET,
  JWT_EXPIRY :process.env.JWT_EXPIRY || '7d',
};
    
