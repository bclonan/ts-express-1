import { Schema, model } from 'mongoose';

interface Auth {
  email: string;
  password: string;
}

const authSchema = new Schema<Auth>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const AuthModel = model<Auth>('Auth', authSchema);

export default AuthModel;