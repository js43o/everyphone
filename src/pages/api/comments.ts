import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import addComment from 'utils/db/addComments';
import getComments from 'utils/db/getComments';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const { phoneUrl, page } = req.query;

  const response = await getComments({
    phoneUrl: phoneUrl as string,
    page: Number(page),
  });
  res.json(response);
});

export default handler;
