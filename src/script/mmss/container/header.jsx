// @flow
import React from 'react';
import {
  inject,
  observer,
} from 'mobx-react';

import Top from '../../shared/component/top.jsx';
import ProgressBar from '../component/header/progress-bar.jsx';

import type MmssEvent from '../event';
import type UiObject from '../store/object/ui';


class Header extends React.Component {
  props: {
    ui: UiObject;
    event: MmssEvent;
  };

  render() {
    const {
      ui,
      event,
    } = this.props;

    return (
      <div className="Header">
        <Top onClick={event.onClickLogout} />
        <ProgressBar loadProgress={ui.loadProgress} />
      </div>
    );
  }
}

export default inject('event')(observer(Header));
