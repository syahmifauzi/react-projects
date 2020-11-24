import React, { useState } from 'react';

const SearchBar = ({ onFormSubmit }) => {
  const [term, setTerm] = useState('');

  const onSubmit = event => {
    event.preventDefault();
    if (term.length > 0) {
      onFormSubmit(term);
    }
  };

  return (
    <form onSubmit={onSubmit} className="form-group wrapper">
      <label htmlFor="input-field">Search For A Video</label>
      <input
        type="text"
        id="input-field"
        className="input-block"
        value={term}
        onChange={event => setTerm(event.target.value)}
      />
    </form>
  );
};

export default SearchBar;
