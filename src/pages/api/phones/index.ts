import { NextApiRequest, NextApiResponse } from 'next';
import getAllPhones from 'lib/getAllPhones';
import { Phone } from 'lib/types';

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  const response: Phone[] = await getAllPhones();
  res.json(response);
}
