import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { MANUFACTURER } from 'utils/constants';
import { getFilteredPhonesByPage } from 'utils/db/functions/phone';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

type QueryType = {
  manufacturer: string[];
  height: string[];
  storage: string[];
  battery: string[];
  weight: string[];
  sortBy: string;
  page: string;
};

handler.get(async (req, res) => {
  const { manufacturer, height, storage, battery, weight, sortBy, page } =
    req.query as QueryType;

  const options = {
    manufacturer: manufacturer || MANUFACTURER,
    height: height.map((value) => Number(value)),
    storage: storage.map((value) => 2 ** Number(value) / 1024 ** 3),
    battery: battery.map((value) => Number(value)),
    weight: weight.map((value) => Number(value)),
    sortBy,
  };

  const response = await getFilteredPhonesByPage(options, Number(page));
  res.json(response);
});

export default handler;
