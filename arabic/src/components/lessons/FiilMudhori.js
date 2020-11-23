import React from 'react';

import fiilMudhori from '../../data/fiil-mudhori';
import TextTranslations from '../shared/TextTranslations';

const tableHeads = [
  {
    ar: 'الفِعْلُ الْمَاضِي',
    en: 'Verb (Past Tense)',
    ms: 'Kata Kerja Masa Lalu (Telah)',
  },
  {
    ar: 'الفِعْلُ الْمُضَارِعُ',
    en: 'Verb (Present Tense)',
    ms: 'Kata Kerja Masa Kini (Sedang)',
  },
];

const FiilMudhori = ({ en, ms }) => {
  const buildRow = row => (
    <tr>
      {row.map((col, colIdx) => (
        <td key={colIdx.toString()}>
          <TextTranslations text={col} en={en} ms={ms} />
        </td>
      ))}
    </tr>
  );

  const buildTable = verbs => {
    return (
      <table className="table-hover app-table">
        <thead style={{ fontWeight: 'bold' }}>{buildRow(tableHeads)}</thead>
        <tbody>
          {verbs.map((verb, verbIdx) => (
            <React.Fragment key={verbIdx.toString()}>
              {buildRow([verb.madhi, verb.mudhori])}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="text-center">
      {fiilMudhori.map((fiil, fiilIdx) => {
        const shapes = fiil.shapes.map(shape => ({
          madhi: { ar: shape.madhi },
          mudhori: { ar: shape.mudhori },
        }));
        return (
          <React.Fragment key={fiilIdx.toString()}>
            <h4>
              {fiil.title.ms} | {fiil.title.en}
            </h4>
            <p>Acuan Fi'il | Verb Shape</p>
            {buildTable(shapes)}
            <p>Contoh Fi'il | Verb Examples</p>
            {buildTable(fiil.examples)}
            {fiilIdx !== fiilMudhori.length - 1 && <hr />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default FiilMudhori;
