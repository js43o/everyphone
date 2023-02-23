import connectMongo from 'utils/db/connectMongo';
import CommentModel from './models/Comment';

export default async function deleteComment(commentId: string) {
  try {
    await connectMongo();
    await CommentModel.findByIdAndRemove(commentId).exec();
  } catch (err: any) {
    throw err;
  }
}
