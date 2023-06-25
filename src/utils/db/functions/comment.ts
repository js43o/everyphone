import bcrypt from 'bcrypt';
import CommentModel from 'utils/db/models/Comment';
import { convertDateToFormattedString } from 'utils/methods';
import { ITEM_PER_PAGE } from 'utils/constants';
import connectMongo from './connectMongo';

export async function addCommentFromAnonymous(
  phoneUrl: string,
  phoneName: string,
  username: string,
  password: string,
  rating: number,
  contents: string
) {
  try {
    await connectMongo();

    const hashedPassword = await bcrypt.hash(password, 10);
    const comment = new CommentModel({
      phoneUrl,
      phoneName,
      username,
      hashedPassword,
      rating,
      contents,
      hasAccount: false,
      date: convertDateToFormattedString(new Date()),
    });
    await comment.save();
  } catch (err: any) {
    throw err;
  }
}

export async function addCommentFromMember(
  phoneUrl: string,
  phoneName: string,
  username: string,
  imgSrc: string,
  rating: number,
  contents: string
) {
  try {
    await connectMongo();

    const comment = new CommentModel({
      phoneUrl,
      phoneName,
      username,
      imgSrc,
      rating,
      contents,
      hasAccount: true,
      date: convertDateToFormattedString(new Date()),
    });
    await comment.save();
  } catch (err: any) {
    throw err;
  }
}

export async function updateComment(
  commentId: string,
  rating: number,
  contents: string
) {
  try {
    await connectMongo();
    await CommentModel.findByIdAndUpdate(commentId, {
      contents,
      rating,
      date: convertDateToFormattedString(new Date()),
    });
  } catch (err: any) {
    throw err;
  }
}

export async function deleteComment(commentId: string) {
  try {
    await connectMongo();
    await CommentModel.findByIdAndRemove(commentId).exec();
  } catch (err: any) {
    throw err;
  }
}

export async function getComments(
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

export async function getCommentsByUsername(
  username: string,
  page: number
): Promise<{
  comments: Comment[];
  lastPage: number;
}> {
  try {
    await connectMongo();

    const query = CommentModel.find({
      username,
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
