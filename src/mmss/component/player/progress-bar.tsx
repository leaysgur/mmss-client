import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

interface Props {
  loadProgress: number;
}

const ProgressBar = ({ loadProgress }: Props) => (
  <Wrap>
    <Inner style={{ width: `${loadProgress}%` }} />
  </Wrap>
);

const Wrap = styled.div`
  height: 4px;
  background-color: #e6e6e6;
`;

const Inner = styled.div`
  height: 4px;
  background-color: var(--linkColor);
`;

export default observer(ProgressBar);
