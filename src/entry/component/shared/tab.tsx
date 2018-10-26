import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

interface Props {
  tabTriggers: string[];
  visibleTab: string;
  onClick(name: string): void;
}

export const TabTrigger = observer(({ tabTriggers, visibleTab, onClick }: Props) => (
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
));

function _onClick(ev: React.MouseEvent<HTMLAnchorElement>, onClick: Props['onClick'], name: string) {
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

export const TabContent = observer(({ tabContents, visibleTab }) => {
  const Content = tabContents[visibleTab];
  return <Content />;
});
