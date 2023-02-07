import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import searchPhonesByName from 'utils/db/searchPhonesByName';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const name = req.query.name as string;
  const response = await searchPhonesByName(name);
  res.json(response);
});

export default handler;
