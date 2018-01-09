import * as React from 'react';
import { observer } from 'mobx-react';

import SearchResult from './search-result';
import { SearchResults } from '../store/object/search';

type OnChange = (keyword: string) => void;
interface SearchFormProps {
  keyword: string,
  results: SearchResults,
  onChange: OnChange,
}

function _onChange(ev: React.FormEvent<HTMLInputElement>, onChange: OnChange): void {
  ev.preventDefault();
  onChange(ev.currentTarget.value);
}

const SearchForm: React.SFC<SearchFormProps> = ({ keyword, results, onChange }) => (
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
      <SearchResult results={results} />
    </div>
  </div>
);

export default observer(SearchForm);
