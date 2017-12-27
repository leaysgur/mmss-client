import React from 'react';
import { observer } from 'mobx-react';

import Result from './search-result.jsx';

function _onChange(ev, onChange) {
  ev.preventDefault();
  if (ev.currentTarget instanceof HTMLInputElement) {
    onChange(ev.currentTarget.value);
  }
}

const SearchForm = ({ keyword, results, onChange }) => (
  <div className="SearchForm">
    <div>
      <input
        type="text"
        placeholder="Artist name"
        onChange={ev => _onChange(ev, onChange)}
        value={keyword}
      />
    </div>
    <div className="SearchForm_Result">
      <Result results={results} />
    </div>
  </div>
);

export default observer(SearchForm);
