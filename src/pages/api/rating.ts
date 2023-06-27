import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getRatingOfPhone } from 'utils/db/functions/phone';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  try {
    const { phoneUrl } = req.query;
    const response = await getRatingOfPhone(phoneUrl as string);
    res.json(response);
  } catch (e) {
    res.status(500).end();
  }
});

export default handler;
