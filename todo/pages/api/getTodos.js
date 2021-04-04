import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

import { table, minifyRecords } from './utils/Airtable';

export default withApiAuthRequired(async (req, res) => {
  try {
    const { user } = getSession(req, res);
    const records = await table
      .select({
        filterByFormula: `userId = '${user.sub}'`,
        fields: ['description', 'completed', 'userName'],
        sort: [{ field: 'createdTime', direction: 'desc' }],
      })
      .firstPage();
    const minifiedRecords = minifyRecords(records);
    res.statusCode = 200;
    res.json(minifiedRecords);
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: 'Something went wrong' });
  }
});
