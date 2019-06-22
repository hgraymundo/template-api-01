'use strict';

const env = {
  PORT: process.env.PORT || 5000,
  DATABASE_NAME: process.env.DATABASE_NAME || 'FmwMGt7ksQ',
  DATABASE_HOST: process.env.DATABASE_HOST || 'remotemysql.com',
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'FmwMGt7ksQ',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'YsuRQb0aPZ',
  DATABASE_PORT: process.env.DATABASE_PORT || 3306,
  DATABASE_DIALECT: process.env.DATABASE_DIALECT || 'mysql',
  NODE_ENV: process.env.NODE_ENV || 'development',

};

module.exports = env
