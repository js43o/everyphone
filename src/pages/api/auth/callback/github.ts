import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import axios from 'axios';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  try {
    const { code } = req.query;
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_ID as string,
        client_secret: process.env.GITHUB_SECRET as string,
        code,
        redirect_url: 'http://localhost:3000',
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );
    const { token_type, access_token } = tokenResponse.data;

    const infoResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    });
    console.log(infoResponse.data.login);

    res.redirect('/');
  } catch (e) {
    res.status(500).end();
  }
});

export default handler;
