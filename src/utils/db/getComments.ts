import { ITEM_PER_PAGE } from 'utils/constants';
import connectMongo from 'utils/db/connectMongo';
import { Comment } from 'utils/types';
import CommentModel from './models/Comment';

export default async function getComments(
  phoneUrl: string,
  page: number
): Promise<{
  comments: Comment[];
  lastPage: number;
}> {
  try {
    await connectMongo();

    const query = CommentModel.find({
      phoneUrl,
    }).select({ hashedPassword: false });

    const lastPage = Math.ceil(
      (await query.clone().countDocuments().exec()) / ITEM_PER_PAGE
    );
    const comments: Comment[] = await query
      .sort({ date: -1 })
      .limit(ITEM_PER_PAGE)
      .skip((page - 1) * ITEM_PER_PAGE);

    return { comments, lastPage };
  } catch (err: any) {
    throw err;
  }
}
