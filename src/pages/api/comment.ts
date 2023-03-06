import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import bcrypt from 'bcrypt';
import addComment from 'utils/db/addComment';
import deleteComment from 'utils/db/deleteComment';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  try {
    const { phoneUrl, username, password, contents } = req.body;

    await addComment(
      phoneUrl as string,
      username as string,
      password as string,
      contents as string
    );

    res.status(200).end();
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
});

handler.delete(async (req, res) => {
  try {
    const { commentId, inputPassword, hashedPassword } = req.query;

    if (!bcrypt.compare(inputPassword as string, hashedPassword as string)) {
      res.status(401).end();
    }
    await deleteComment(commentId as string);
    res.status(200).end();
  } catch (e) {
    res.status(500).end();
  }
});

export default handler;
