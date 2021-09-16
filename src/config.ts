import dotenv from 'dotenv';
import convict from 'convict';

dotenv.config();

const config = convict({
  app: {
    env: {
      doc: 'The application environment.',
      format: ['production', 'development', 'staging'],
      default: 'development',
      env: 'NODE_ENV',
    },
    host: {
      doc: 'The application host url',
      format: 'url',
      default: '127.0.0.1',
      env: 'HOST',
    },
    port: {
      doc: 'The port to bind.',
      format: 'port',
      default: 3000,
      env: 'PORT',
    },
    cors: {
      doc: 'CORS allowed origins',
      format: 'regexArray',
      default: [],
      env: 'CORS',
    },
  },
  db: {
    host: {
      doc: 'Database host name/IP',
      format: 'ipaddress',
      default: 'localhost',
      env: 'DB_HOST',
    },
    port: {
      doc: 'Database post',
      format: Number,
      default: 5432,
      env: 'DB_PORT',
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'postgres',
      env: 'DB_NAME',
    },
    user: {
      doc: 'Database user',
      format: String,
      default: 'postgres',
      env: 'DB_USER',
    },
    password: {
      doc: 'Database password',
      format: String,
      default: 'password',
      env: 'DB_PASS',
    },
    sync: {
      doc: 'Database Synchronize flag',
      format: Boolean,
      default: true,
      env: 'DB_SYNC',
    },
  },
});

export default config;
