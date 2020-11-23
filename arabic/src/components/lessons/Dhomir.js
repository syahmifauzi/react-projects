import React from 'react';

import dhomir from '../../data/dhomir';
import TextTranslations from '../shared/TextTranslations';

const Dhomir = ({ en, ms }) => {
  const buildRow = row => (
    <tr>
      {row.map((col, idx) => (
        <td key={idx.toString()}>
          <TextTranslations text={col} en={en} ms={ms} />
        </td>
      ))}
    </tr>
  );

  return (
    <table className="table-hover app-table">
      <thead style={{ fontWeight: 'bold' }}>{buildRow(dhomir[0])}</thead>
      <tbody>
        {dhomir.slice(1).map((row, idx) => (
          <React.Fragment key={idx.toString()}>{buildRow(row)}</React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default Dhomir;
