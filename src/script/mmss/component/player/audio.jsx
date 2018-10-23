import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

class Audio extends React.Component {
  constructor() {
    super();

    this.elRef = React.createRef();
    this._handleKeyDown = ev => {
      if (ev.keyCode !== 32) {
        return;
      }

      const el = this.elRef.current;
      if (el instanceof HTMLAudioElement === false) {
        return;
      }
      if (el.readyState !== HTMLAudioElement.HAVE_ENOUGH_DATA) {
        return;
      }

      ev.preventDefault();
      el.paused ? el.play() : el.pause();
    };
  }

  render() {
    const { src, onEnded } = this.props;

    return (
      <Wrap
        ref={this.elRef}
        autoPlay
        controls
        controlsList="nodownload"
        src={src}
        onEnded={onEnded}
      />
    );
  }

  componentDidMount() {
    window.addEventListener('keydown', this._handleKeyDown, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleKeyDown, false);
  }
}

const Wrap = styled.audio`
  width: 100%;
  vertical-align: top;
`;

export default observer(Audio);
