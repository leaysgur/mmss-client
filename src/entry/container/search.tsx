import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import Result from '../component/search/search-result';

import EntryStore from '../store';
import EntryEvent from '../event';

interface Props {
  event?: EntryEvent;
  store?: EntryStore;
}

const Search = ({ event, store }: Props) => {
  const { onChangeKeyword } = event!;
  const { search } = store!;

  return (
    <Wrap>
      <Input
        type="text"
        placeholder="ArtistName"
        onChange={ev => _onChange(ev, onChangeKeyword)}
        value={search.keyword}
      />
      <Result results={search.results} />
    </Wrap>
  );
};

function _onChange(ev: React.ChangeEvent<HTMLInputElement>, onChange: EntryEvent['onChangeKeyword']) {
  ev.preventDefault();
  onChange(ev.currentTarget.value);
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

export default inject('event', 'store')(observer(Search));
