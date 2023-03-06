import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import bcrypt from 'bcrypt';
import addComment from 'utils/db/addComment';
import deleteComment from 'utils/db/deleteComment';
import updateComment from 'utils/db/updateComment';

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

handler.patch(async (req, res) => {
  try {
    const { commentId, inputPassword, hashedPassword, contents } = req.body;

    const checked = await bcrypt.compare(
      inputPassword as string,
      hashedPassword as string
    );
    if (!checked) {
      res.status(401).end();
      return;
    }

    await updateComment(commentId as string, contents as string);
    res.status(200).end();
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
});

handler.delete(async (req, res) => {
  try {
    const { commentId, inputPassword, hashedPassword } = req.query;

    const checked = await bcrypt.compare(
      inputPassword as string,
      hashedPassword as string
    );
    if (!checked) {
      res.status(401).end();
      return;
    }

    await deleteComment(commentId as string);
    res.status(200).end();
  } catch (e) {
    res.status(500).end();
  }
});

export default handler;
