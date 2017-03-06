// @flow
import React from 'react';
import { observer } from 'mobx-react';

import type UiObject from '../../store/object/ui';


const ProgressBar = ({ ui }: { ui: UiObject }) => (
  <div className="ProgressBar">
    <div className="ProgressBar_Inner" style={{ width: `${ui.loadProgress}%` }}></div>
  </div>
);

export default observer(ProgressBar);
