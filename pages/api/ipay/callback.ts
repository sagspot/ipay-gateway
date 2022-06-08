import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { URLSearchParams } from 'url';

function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        console.log('req.query =>', req.query);

        switch (req.query.status) {
          case 'aei7p7yrx4ae34':
            // Success: The transaction is valid. Therefore you can update this transaction
            res.status(200).redirect('/success');
            break;

          case 'fe2707etr5s4wq':
            // Failed transaction. Not all parameters fulfilled. A notification of this transaction sent to the merchant
            res.status(400).redirect('/failed');
            break;

          case 'bdi6p2yy76etrs':
            // Pending: Incoming Mobile Money Transaction Not found. Please try again in 5 minutes
            res.status(400).redirect('/');

          case 'cr5i3pgy9867e1':
            // Used: This code has been used already. A notification of this transaction sent to the merchant
            res.status(400).redirect('/');
            break;

          case 'dtfi4p7yty45wq':
            // Less: The amount that you have sent via mobile money is LESS than what was required to validate this transaction
            res.status(400).redirect('/');
            break;

          case 'eq3i7p5yt7645e':
            // More: The amount that you have sent via mobile money is MORE than what was required to validate this transaction. (Up to the merchant to decide what to do with this transaction; whether to pass it or not)
            res.status(400).redirect('/');
            break;

          default:
            res.status(500).json({ message: 'Status code not captured' });
            break;
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}

export default handler;
