import { ConnectionOptions } from 'mongoose';

const config: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  dbName: process.env.DB_NAME || 'my-library',
  user: process.env.DB_USER || '',
  pass: process.env.DB_PASS || '',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '27017', 10),
};

export default config;