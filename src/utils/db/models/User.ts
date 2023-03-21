import { Schema, model, models } from 'mongoose';
import { User } from 'utils/types';

const UserSchema = new Schema<User & { hashedPassword: String }>({
  username: String,
  provider: String,
  hashedPassword: String,
  ownedPhone: String,
  comments: [String],
  favorites: [String],
});

const UserModel = models.User || model('User', UserSchema);

export default UserModel;
