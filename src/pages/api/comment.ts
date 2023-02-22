import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import addComment from 'utils/db/addComments';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  try {
    const { phoneUrl, username, password, contents } = req.body;

    await addComment({
      phoneUrl: phoneUrl as string,
      username: username as string,
      password: password as string,
      contents: contents as string,
    });

    res.json({ ok: 'ok' });
  } catch (e) {
    res.status(500);
  }
});

export default handler;
