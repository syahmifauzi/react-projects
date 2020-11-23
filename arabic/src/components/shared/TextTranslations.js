import React from 'react';

const TextTranslations = ({ text, en, ms }) => (
  <>
    {text.ar && text.ar + ' '}
    {en && text.en && <span className="badge success">{text.en}</span>}
    {en && text.en && ' '}
    {ms && text.ms && <span className="badge secondary">{text.ms}</span>}
  </>
);

export default TextTranslations;
