// @flow
import React from 'react';


const Header = ({
  onClick,
}: {
  onClick?: () => void;
}) => (
  <div className="Header">
    <span onClick={() => onClick && onClick() }>MMSS</span>
  </div>
);

export default Header;
