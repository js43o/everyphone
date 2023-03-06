import connectMongo from 'utils/db/connectMongo';
import { convertDateToFormattedString } from 'utils/methods';
import CommentModel from './models/Comment';

export default async function updateComment(
  commentId: string,
  contents: string
) {
  try {
    await connectMongo();
    await CommentModel.findByIdAndUpdate(commentId, {
      contents,
      date: convertDateToFormattedString(new Date()),
    });
  } catch (err: any) {
    throw err;
  }
}
