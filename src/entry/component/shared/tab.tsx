import React, { ReactType } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

interface TriggerProps {
  tabTriggers: string[];
  visibleTab: string;
  onClick(name: string): void;
}

export const TabTrigger = observer(({ tabTriggers, visibleTab, onClick }: TriggerProps) => (
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

function _onClick(ev: React.MouseEvent<HTMLAnchorElement>, onClick: TriggerProps['onClick'], name: string) {
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

interface ContentProps {
  tabContents: {
    [key: string]: ReactType;
  };
  visibleTab: string;
}

export const TabContent = observer(({ tabContents, visibleTab }: ContentProps) =>
  <>{tabContents[visibleTab]}</>,
);
