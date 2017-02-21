// @flow
import React from 'react';
import { observer } from 'mobx-react';

import type { MmssStoreType } from '../store';
import type { MmssEventType } from '../event';


class MmssApp extends React.Component {
  props: {
    event: MmssEventType;
    store: MmssStoreType;
  };

  render() {
    return (
      <div>
        <p>App!</p>
      </div>
    );
  }
}

export default observer(MmssApp);
