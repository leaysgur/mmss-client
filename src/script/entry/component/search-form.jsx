// @flow
import React from 'react';
import { observer } from 'mobx-react';

import Result from './search-result.jsx';

import type { SearchResult } from '../store/object/search';


const SearchForm = ({
  results,
  onInput,
}: {
  results: SearchResult;
  onInput: (keyword: string) => void;
}) => {
  const _onInput = (ev: Event): void => {
    ev.preventDefault();
    if (ev.currentTarget instanceof HTMLInputElement) {
      onInput(ev.currentTarget.value);
    }
  };

  return (
    <div className="SearchForm">
      <div>
        <input
          type="text"
          placeholder="Artist name"
          onInput={_onInput}
        />
      </div>
      <div className="SearchForm_Result">
        <Result results={results} />
      </div>
    </div>
  );
};

export default observer(SearchForm);
