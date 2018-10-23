import React from 'react';
import styled from 'styled-components';

const Result = ({ results }) => {
  if (results === null) {
    return (
      <Wrap>
        <li>Not found</li>
      </Wrap>
    );
  }

  return (
    <Wrap>
      {Object.keys(results).map(artistName => (
        <li key={artistName}>
          <Artist># {artistName}</Artist>
          <ul>
            {results[artistName].map(albumName => (
              <li key={albumName}>
                <Album>- {albumName}</Album>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </Wrap>
  );
};

const Wrap = styled.ul`
  min-height: 10vh;
  padding: 10px;
  background-color: #fafafa;
  text-align: left;
  font-size: .8rem;
`;

const Artist = styled.div`
  font-weight: 900;
`;

const Album = styled.div`
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
`;

export default Result;
