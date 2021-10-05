import dotenv from 'dotenv';
import convict from 'convict';
import { Transport } from '@nestjs/microservices';
import { regexArray } from './app/common/config/config-schemas';

dotenv.config();

convict.addFormats({
  regexArray,
});

const config = convict({
  app: {
    env: {
      doc: 'The application environment.',
      format: ['production', 'development', 'staging'],
      default: 'development',
      env: 'NODE_ENV',
    },
    cors: {
      doc: 'CORS allowed origins',
      format: 'regexArray',
      default: [],
      env: 'CORS',
    },
    host: {
      doc: 'The application host url',
      format: 'url',
      default: '0.0.0.0',
      env: 'HOST',
    },
    port: {
      doc: 'The port to bind.',
      format: 'port',
      default: 3000,
      env: 'PORT',
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
      format: 'port',
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
  s2s: {
    transport: {
      doc: 'Transport used for s2s communication',
      format: Number,
      default: Transport.REDIS,
      env: 'S2S_TRANSPORT',
    },
    options: {
      url: {
        doc: 'Redis URL',
        format: String,
        default: 'redis://localhost:6379',
        env: 'S2S_REDIS_URL',
      },
    },
  },
});

export default config;
