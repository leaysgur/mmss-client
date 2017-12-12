import React from 'react';
import { inject, observer } from 'mobx-react';

import Top from '../../shared/component/top.jsx';

class Header extends React.Component {
  render() {
    const { event } = this.props;

    return (
      <div className="Header">
        <Top onClick={event.onClickLogout} />
      </div>
    );
  }
}

export default inject('event')(observer(Header));
