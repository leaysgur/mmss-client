import React from 'react';

const Top = ({ onClick }) => (
  <div className="Top">
    <span onClick={() => onClick && onClick()}>MMSS</span>
  </div>
);

export default Top;
