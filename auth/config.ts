import { config } from 'dotenv';

config();

export default {
  port: process.env.AUTH_PORT || 3001,
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/my-library-auth',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'my-library-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
};