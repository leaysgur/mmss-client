import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import Result from './search-result';

const SearchForm = ({ keyword, results, onChange }) => (
  <Wrap>
    <Input
      type="text"
      placeholder="ArtistName"
      onChange={ev => _onChange(ev, onChange)}
      value={keyword}
    />

    <Result results={results} />
  </Wrap>
);

function _onChange(ev, onChange) {
  ev.preventDefault();
  if (ev.currentTarget instanceof HTMLInputElement) {
    onChange(ev.currentTarget.value);
  }
}

const Wrap = styled.div`
  text-align: center;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 250px;
  padding: 5px 10px;
  margin-bottom: 10px;
  font-size: 1rem;

  &:hover,
  &:focus {
    border: 2px solid var(--linkColor);
    outline: none;
  }
`;

export default observer(SearchForm);
