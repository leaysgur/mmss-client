import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

const Top = () => (
  <Wrap>
    <span>MMSS</span>
  </Wrap>
);

const Wrap = styled.div`
  height: 4vh;
  line-height: 4vh;
  text-align: center;
  background-color: #434343;
  color: #fff;
`;

export default observer(Top);
