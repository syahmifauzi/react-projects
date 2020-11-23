import React, { useEffect, useState } from 'react';

import dhomir from '../../data/dhomir';
import fiilMadhi from '../../data/fiil-madhi';
import TextTranslations from '../shared/TextTranslations';

const tableHeads = [
  {
    ar: 'الفِعْلُ الْمَاضِي',
    en: 'Verb (Past Tense)',
    ms: 'Kata Kerja Masa Lampau (telah)',
  },
  {
    ar: 'الضَّمَائِر',
    en: 'Pronoun',
    ms: 'Kata Ganti Nama',
  },
];

const FiilMadhi = ({ en, ms }) => {
  const [activeVerb, setActiveVerb] = useState({
    ar: '',
    en: '',
    ms: '',
  });

  useEffect(() => {
    setActiveVerb(fiilMadhi.words[0].verbs[0]);
  }, [setActiveVerb]);

  const buildRow = row => (
    <tr>
      {row.map((col, colIdx) => (
        <td key={colIdx.toString()}>
          <TextTranslations text={col} en={en} ms={ms} />
        </td>
      ))}
    </tr>
  );

  const buildTable = () => {
    const dmr = dhomir.slice(1).map(dmr => dmr[0]);

    return (
      <table className="table-hover app-table">
        <thead style={{ fontWeight: 'bold' }}>{buildRow(tableHeads)}</thead>
        <tbody>
          {fiilMadhi.feelEnds.map((end, endIdx) => {
            const verb = { ...activeVerb, ar: activeVerb.ar + end };
            return (
              <React.Fragment key={endIdx.toString()}>
                {buildRow([dmr[endIdx], verb])}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <div className="row flex-center text-center">
        {fiilMadhi.words.map((word, idx) => (
          <div className="xs-12 sm-6" key={idx.toString()}>
            <h4>
              {word.title.ms} | {word.title.en}
            </h4>
            {word.verbs.map((verb, verbIdx) => (
              <button
                style={{ direction: 'rtl' }}
                key={verbIdx.toString()}
                onClick={() => setActiveVerb(verb)}
                className={
                  activeVerb.ar === verb.ar
                    ? 'btn-primary'
                    : 'btn-primary-outline'
                }>
                <TextTranslations text={verb} en={en} ms={ms} />
              </button>
            ))}
          </div>
        ))}
      </div>
      <hr />
      <div>{buildTable()}</div>
    </>
  );
};

export default FiilMadhi;
