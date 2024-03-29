import { Schema, model, models } from 'mongoose';
import { Comment } from 'utils/types';

const CommentSchema = new Schema<Comment & { hashedPassword: String }>({
  phoneUrl: { type: String, required: true },
  phoneName: { type: String, required: true },
  hasAccount: { type: Boolean, required: true },
  username: { type: String, required: true },
  imgSrc: { type: String, required: false },
  rating: { type: Number, required: false },
  contents: { type: String, required: true },
  date: { type: String, required: true },
  hashedPassword: String,
});

const CommentModel = models.Comment || model('Comment', CommentSchema);

export default CommentModel;
