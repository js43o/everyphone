import { Schema, model, models } from 'mongoose';
import { Comment } from 'utils/types';

const CommentSchema = new Schema<Comment & { hashedPassword: String }>({
  phoneUrl: String,
  username: String,
  hashedPassword: String,
  contents: String,
  date: String,
});

const CommentModel = models.Comment || model('Comment', CommentSchema);

export default CommentModel;
