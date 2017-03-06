// @flow
import React from 'react';
import { observer } from 'mobx-react';


const ProgressBar = ({
  loadProgress,
}: {
  loadProgress: number;
}) => (
  <div className="ProgressBar">
    <div
      className="ProgressBar_Inner"
      style={{ width: `${loadProgress}%` }}
    ></div>
  </div>
);

export default observer(ProgressBar);
