import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

import { table, getMinifiedRecord } from './utils/Airtable';

export default withApiAuthRequired(async (req, res) => {
  try {
    const { user } = getSession(req, res);
    const { description } = req.body;
    const createdRecords = await table.create([
      {
        fields: {
          description,
          userId: user.sub,
          userName: user.name,
          userEmail: user.email,
        },
      },
    ]);
    const minifiedRecord = getMinifiedRecord(createdRecords[0]);
    res.statusCode = 200;
    res.json(minifiedRecord);
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: 'Something went wrong' });
  }
});
