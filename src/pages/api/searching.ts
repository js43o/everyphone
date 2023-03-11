import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import searchPhonesByName from 'utils/db/functions/searching';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  try {
    const name = req.query.name as string;
    const response = await searchPhonesByName(name);
    res.json(response);
  } catch (e) {
    res.status(500).end();
  }
});

export default handler;
