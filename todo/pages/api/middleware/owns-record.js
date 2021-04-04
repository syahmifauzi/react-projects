import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

import { table } from '../utils/Airtable';

const ownsRecord = handler =>
  withApiAuthRequired(async (req, res) => {
    try {
      const { user } = getSession(req, res);
      const { id } = req.body;
      const existingRecord = await table.find(id);
      if (!existingRecord || existingRecord.fields.userId !== user.sub) {
        res.statusCode(404);
        return res.json({ msg: 'Record not found' });
      }
      req.record = existingRecord;
      return handler(req, res);
    } catch (err) {
      console.log(err);
      res.statusCode(500);
      return res.json({ msg: 'Something went wrong' });
    }
  });

export default ownsRecord;
