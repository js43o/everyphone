import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import searchPhonesByName from 'utils/api/searchPhonesByName';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const input = req.query.input as string;
  const response = await searchPhonesByName(input);
  res.json(response);
});

export default handler;
