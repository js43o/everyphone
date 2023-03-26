import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import bcrypt from 'bcrypt';
import {
  addCommentFromAnonymous,
  addCommentFromMember,
  updateComment,
  deleteComment,
} from 'utils/db/functions/comment';
import CommentModel from 'utils/db/models/Comment';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  try {
    const { phoneUrl, hasAccount, username, password, contents } = req.body;

    if (hasAccount) {
      await addCommentFromMember(
        phoneUrl as string,
        username as string,
        contents as string
      );
      res.status(201).end();
      return;
    }

    await addCommentFromAnonymous(
      phoneUrl as string,
      username as string,
      password as string,
      contents as string
    );

    res.status(201).end();
  } catch (e) {
    res.status(500).end();
  }
});

handler.patch(async (req, res) => {
  try {
    const { commentId, hasAccount, password, contents } = req.body;
    const { hashedPassword } = await CommentModel.findById(commentId).exec();

    console.log(hasAccount);

    if (!hasAccount) {
      const checked = await bcrypt.compare(
        password as string,
        hashedPassword as string
      );
      if (!checked) {
        res.status(401).end();
        return;
      }
    }

    await updateComment(commentId as string, contents as string);
    res.status(200).end();
  } catch (e) {
    res.status(500).end();
  }
});

handler.delete(async (req, res) => {
  try {
    const { commentId, hasAccount, password } = req.query;
    const { userId: commentUserId, hashedPassword } =
      await CommentModel.findById(commentId).exec();

    if (!hasAccount) {
      const checked = await bcrypt.compare(
        password as string,
        hashedPassword as string
      );
      if (!checked) {
        res.status(401).end();
        return;
      }
    }

    await deleteComment(commentId as string);
    res.status(204).end();
  } catch (e) {
    res.status(500).end();
  }
});

export default handler;
