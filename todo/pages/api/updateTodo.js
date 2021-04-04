import ownsRecord from './middleware/owns-record';
import { table, getMinifiedRecord } from './utils/Airtable';

export default ownsRecord(async (req, res) => {
  try {
    const { id, fields } = req.body;
    const updatedRecords = await table.update([{ id, fields }]);
    const minifiedRecord = getMinifiedRecord(updatedRecords[0]);
    res.statusCode = 200;
    res.json(minifiedRecord);
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: 'Something went wrong' });
  }
});
