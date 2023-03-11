import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getPhoneByName } from 'utils/db/functions/phone';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  try {
    const name = req.query.name as string;
    const response = await getPhoneByName(name);
    res.json(response);
  } catch (e) {
    res.status(500).end();
  }
});

export default handler;
