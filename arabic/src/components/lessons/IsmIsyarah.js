import React from 'react';

import ismIsyarah from '../../data/ism-isyarah';
import TextTranslations from '../shared/TextTranslations';

const IsmIsyarah = ({ en, ms }) => {
  const buildRow = row => (
    <tr>
      {row.map((col, colIdx) => (
        <td key={colIdx.toString()}>
          <TextTranslations text={col} en={en} ms={ms} />
        </td>
      ))}
    </tr>
  );

  return ismIsyarah.map((table, tableIdx) => (
    <React.Fragment key={tableIdx.toString()}>
      <table className="table-hover app-table">
        <thead style={{ fontWeight: 'bold' }}>{buildRow(table[0])}</thead>
        <tbody>
          {table.slice(1).map((row, rowIdx) => (
            <React.Fragment key={rowIdx.toString()}>
              {buildRow(row)}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {tableIdx === 0 && <hr />}
    </React.Fragment>
  ));
};

export default IsmIsyarah;
