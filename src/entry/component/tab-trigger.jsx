import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const TabTrigger = ({ tabNames, visibleTab, onClick }) => (
  <Wrap>
    {tabNames.map(name => (
      <Item
        key={name}
        {...(visibleTab === name
          ? {
              className: 'isSelected',
            }
          : {
              href: '#',
              onClick: ev => {
                ev.preventDefault();
                onClick(name);
              },
            })}
      >
        {name}
      </Item>
    ))}
  </Wrap>
);

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Item = styled.a`
  padding: 0 10px;
  margin: 10px 0;
  color: inherit;

  &:hover,
  &.isSelected {
    border-bottom: 3px solid var(--linkColor);
  }
`;

export default observer(TabTrigger);
