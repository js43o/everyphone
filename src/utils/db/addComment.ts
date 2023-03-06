import bcrypt from 'bcrypt';
import connectMongo from 'utils/db/connectMongo';
import { convertDateToFormattedString } from 'utils/methods';
import CommentModel from './models/Comment';

export default async function addComment(
  phoneUrl: string,
  username: string,
  password: string,
  contents: string
) {
  try {
    await connectMongo();

    const hashedPassword = await bcrypt.hash(password, 10);
    const comment = new CommentModel({
      phoneUrl,
      username,
      hashedPassword,
      contents,
      date: convertDateToFormattedString(new Date()),
    });
    await comment.save();
  } catch (err: any) {
    throw err;
  }
}
