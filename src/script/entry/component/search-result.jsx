import React from 'react';
import { observer } from 'mobx-react';

const Result = ({ results }) => {
  if (results === null) {
    return <div className="SearchResult">Not found</div>;
  }

  return (
    <ul className="SearchResult">
      {Object.keys(results).map(artistName => {
        if (results === null) {
          return;
        }
        return (
          <li key={artistName}>
            <div className="SearchResult_Artist"># {artistName}</div>
            <ul>
              {results[artistName].map(albumName => (
                <li key={albumName} className="SearchResult_Album">
                  - {albumName}
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default observer(Result);
