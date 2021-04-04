import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const table = base(process.env.AIRTABLE_TABLE_NAME_USER);

export default withApiAuthRequired(async (req, res) => {
  try {
    const { user } = getSession(req, res);
    const existingUser = await table
      .select({ filterByFormula: `userId = '${user.sub}'` })
      .all();
    if (!existingUser.length) {
      await table.create([
        {
          fields: {
            userId: user.sub,
            userName: user.name,
            userEmail: user.email,
          },
        },
      ]);
    }
    res.statusCode = 200;
    res.json({});
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.json({ msg: 'Something went wrong' });
  }
});
