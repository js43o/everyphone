import { Schema, model, models, Model, Document } from 'mongoose';
import { Comment } from 'utils/types';

const CommentSchema = new Schema<Comment>({
  phoneUrl: String,
  username: String,
  hashedPassword: String,
  contents: String,
  date: String,
});

const CommentModel = models.Comment || model<Comment>('Comment', CommentSchema);

export default CommentModel;
