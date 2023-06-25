import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getPhoneByName } from 'utils/db/functions/phone';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  try {
    const { name, phoneUrl } = req.query;
    let response = null;

    if (!!name) {
      response = await getPhoneByName(name as string);
    }
    if (!!phoneUrl) {
      response = await getPhoneByName(phoneUrl as string);
    }

    res.json(response);
  } catch (e) {
    res.status(500).end();
  }
});

export default handler;
