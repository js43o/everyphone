import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import getPhones from 'lib/getPhones';
import { Phone } from 'lib/types';
import { MANUFACTURER } from 'lib/constants';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const options = {
    manufacturer: req.query.manufacturer
      ? (req.query.manufacturer as string[])
      : MANUFACTURER,
    height: (req.query.height as string[]).map((value) => Number(value)),
    storage: (req.query.storage as string[]).map(
      (value) => 2 ** Number(value) / 1024 ** 3
    ),
    battery: (req.query.battery as string[]).map((value) => Number(value)),
    weight: (req.query.weight as string[]).map((value) => Number(value)),
  };

  const response: Phone[] = await getPhones(options);
  res.json(response);
});

export default handler;
