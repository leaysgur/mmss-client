import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

interface Props {
  src: string;
  onEnded(): void;
}

class Audio extends React.Component<Props> {
  elRef: React.RefObject<HTMLAudioElement>;

  constructor(props: Props) {
    super(props);

    this.elRef = React.createRef();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  render() {
    const { src, onEnded } = this.props;

    // XXX: 本来は <Wrap /> 自体が audio であってほしいが、そうするとなぜか ref で型エラーが出る
    return (
      <Wrap>
        <audio
          ref={this.elRef}
          style={{ width: 'inherit', verticalAlign: 'inherit' }}
          autoPlay
          controls
          controlsList="nodownload"
          src={src}
          onEnded={onEnded}
        />
      </Wrap>
    );
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown, false);
  }

  private handleKeyDown(ev: KeyboardEvent) {
    if (ev.keyCode !== 32) {
      return;
    }

    const el = this.elRef.current;
    if (!el || el instanceof HTMLAudioElement === false) {
      return;
    }
    if (el.readyState !== HTMLAudioElement.prototype.HAVE_ENOUGH_DATA) {
      return;
    }

    ev.preventDefault();
    el.paused ? el.play() : el.pause();
  }
}

const Wrap = styled.div`
  width: 100%;
  vertical-align: top;
`;

export default observer(Audio);
