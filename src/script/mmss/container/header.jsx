import React from 'react';
import { inject, observer } from 'mobx-react';

import Top from '../../shared/component/top.jsx';
import ProgressBar from '../component/header/progress-bar.jsx';

class Header extends React.Component {
  render() {
    const { ui, event } = this.props;

    return (
      <div className="Header">
        <Top onClick={event.onClickLogout} />
        <ProgressBar loadProgress={ui.loadProgress} />
      </div>
    );
  }
}

export default inject('event')(observer(Header));
