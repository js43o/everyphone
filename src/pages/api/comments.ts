import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getComments, getCommentsByUsername } from 'utils/db/functions/comment';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  try {
    const { phoneUrl, username, page } = req.query;
    let response = null;

    if (!!phoneUrl) {
      response = await getComments(phoneUrl as string, Number(page));
    }

    if (!!username) {
      response = await getCommentsByUsername(username as string, Number(page));
    }

    res.json(response);
  } catch (e) {
    res.status(500).end();
  }
});

export default handler;
