import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import getPhoneByName from 'utils/api/getPhoneByName';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const name = req.query.name as string;
  const response = await getPhoneByName(name);
  res.json(response);
});

export default handler;
