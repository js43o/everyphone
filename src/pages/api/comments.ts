import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getComments } from 'utils/db/functions/comment';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  try {
    const { phoneUrl, page } = req.query;
    const response = await getComments(phoneUrl as string, Number(page));
    res.json(response);
  } catch (e) {
    res.status(500).end();
  }
});

export default handler;
