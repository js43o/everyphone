import { Schema, model, models, Model } from 'mongoose';
import { Comment } from 'utils/types';

const commentSchema = new Schema<Comment>({
  phoneUrl: String,
  username: String,
  contents: String,
  date: String,
});

const CommentModel: Model<Comment, {}, {}, {}, any> =
  models.Comment || model<Comment>('Comment', commentSchema);

export default CommentModel;
