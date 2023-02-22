import connectMongo from 'utils/db/connectMongo';
import { convertDateToFormattedString, hashPassword } from 'utils/methods';
import CommentModel from './models/Comment';

export default async function addComment(props: {
  phoneUrl: string;
  username: string;
  password: string;
  contents: string;
}) {
  try {
    await connectMongo();

    const { phoneUrl, username, password, contents } = props;
    const hashedPassword = await hashPassword(password);

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
