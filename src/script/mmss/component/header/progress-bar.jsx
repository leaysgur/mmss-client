import React from 'react';
import { observer } from 'mobx-react';

const ProgressBar = ({ loadProgress }) => (
  <div className="ProgressBar">
    <div className="ProgressBar_Inner" style={{ width: `${loadProgress}%` }} />
  </div>
);

export default observer(ProgressBar);
