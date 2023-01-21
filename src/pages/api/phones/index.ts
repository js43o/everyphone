import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import getPhones from 'lib/getPhones';
import { Phone } from 'lib/types';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const response: Phone[] = await getPhones();
  res.json(response);
});

export default handler;
