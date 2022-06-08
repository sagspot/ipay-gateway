import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { URLSearchParams } from 'url';

const callbackUrl = 'http://localhost:3000/api/ipay/callback';

function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const values = {
        live: '0',
        oid: req.body.order, //should be unique
        inv: req.body.order,
        ttl: req.body.amount,
        tel: req.body.tel,
        eml: req.body.email,
        vid: process.env.IPAY_VID as string,
        curr: 'KES',
        p1: 'airtel',
        p2: '020102292999',
        p3: '',
        p4: '900',
        cbk: callbackUrl, //call back
        cst: '1',
        crl: '2',
      };
      const hashkey = process.env.IPAY_HASHKEY as string; //provided by iPay during  registration

      //concatinating data-string
      const data = Object.values(values)
        .map((val) => val)
        .join('');

      console.log('dataString', data);

      //generating the key
      const hashstring = crypto
        .createHmac('sha1', hashkey)
        .update(data)
        .digest('hex');

      const param = new URLSearchParams({
        ...values,
        hsh: hashstring,
      }).toString();

      const url = 'https://payments.ipayafrica.com/v3/ke' + '?' + param; //url generated append params

      res.send(url); //open this url on another tab

      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}

export default handler;
