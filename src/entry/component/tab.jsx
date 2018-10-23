import React from 'react';
import styled from 'styled-components';

export const TabTrigger = ({ tabTriggers, visibleTab, onClick }) => (
  <Wrap>
    {tabTriggers.map(name => (
      <Item
        key={name}
        {...(visibleTab === name
          ? {
              className: 'isSelected',
            }
          : {
              href: '#',
              onClick: ev => _onClick(ev, onClick, name),
            }
        )}
      >
        {name}
      </Item>
    ))}
  </Wrap>
);

function _onClick(ev, onClick, name) {
  ev.preventDefault();
  onClick(name);
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Item = styled.a`
  padding: 0 10px;
  margin: 10px .5px;
  color: inherit;

  &:hover,
  &.isSelected {
    border-bottom: 3px solid var(--linkColor);
  }
`;

export const TabContent = ({ tabContents, visibleTab }) => {
  const Content = tabContents[visibleTab];
  return <Content />;
};
