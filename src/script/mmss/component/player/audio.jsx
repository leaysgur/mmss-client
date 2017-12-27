import React from 'react';
import { observer } from 'mobx-react';

class Audio extends React.Component {
  constructor() {
    super();

    this._handleKeyDown = ev => {
      if (ev.keyCode !== 32) {
        return;
      }
      if (this.el instanceof HTMLAudioElement === false) {
        return;
      }
      if (this.el.src.length === 0) {
        return;
      }

      ev.preventDefault();
      this.el.paused ? this.el.play() : this.el.pause();
    };
  }

  render() {
    const { src, onEnded } = this.props;

    return (
      <audio
        className="Audio"
        ref={el => this.el = el}
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

export default observer(Audio);
