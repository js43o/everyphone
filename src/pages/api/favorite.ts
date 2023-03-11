import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getPhonesByName } from 'utils/db/functions/phone';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  try {
    const names = req.query['names[]'] as string[];
    const response = await getPhonesByName(names);
    res.json(response);
  } catch (e) {
    res.status(500).end();
  }
});

export default handler;
