// @flow
import React from 'react';
import { observer } from 'mobx-react';

import Result from './search-result.jsx';

import type { SearchResult } from '../store/object/search';


const SearchForm = ({
  keyword,
  results,
  onChange,
}: {
  keyword: string;
  results: SearchResult;
  onChange: (keyword: string) => void;
}) => {
  const _onChange = (ev: Event): void => {
    ev.preventDefault();
    if (ev.currentTarget instanceof HTMLInputElement) {
      onChange(ev.currentTarget.value);
    }
  };

  return (
    <div className="SearchForm">
      <div>
        <input
          type="text"
          placeholder="Artist name"
          onChange={_onChange}
          value={keyword}
        />
      </div>
      <div className="SearchForm_Result">
        <Result results={results} />
      </div>
    </div>
  );
};

export default observer(SearchForm);
