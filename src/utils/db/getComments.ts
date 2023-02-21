import { ITEM_PER_PAGE, SORT_BY_QUERY } from 'utils/constants';
import connectMongo from 'utils/db/connectMongo';
import { Comment } from 'utils/types';
import CommentModel from './models/Comment';

export default async function getComments(props: {
  phoneUrl: string;
  page: number;
}): Promise<{
  comments: Comment[];
  lastPage: number;
}> {
  try {
    await connectMongo();

    const { phoneUrl, page } = props;
    const query = CommentModel.find({
      phoneUrl,
    });

    const lastPage = Math.ceil(
      (await query.clone().countDocuments().exec()) / ITEM_PER_PAGE
    );
    const comments = await query
      .sort(SORT_BY_QUERY.get('latest'))
      .limit(ITEM_PER_PAGE)
      .skip((page - 1) * ITEM_PER_PAGE);

    return { comments, lastPage };
  } catch (err: any) {
    throw err;
  }
}
