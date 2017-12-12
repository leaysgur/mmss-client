import React from 'react';
import { observer } from 'mobx-react';

class AlbumItem extends React.Component {
  constructor() {
    super();

    this._handleMouseEnter = () => {
      this.props.onClick(this.props.item);
    };
  }

  render() {
    const { item, isSelected, onClickPlay } = this.props;

    return (
      <div
        className={`AlbumItem ${isSelected ? '-selected' : ''}`}
        ref={ref => {
          this.el = ref;
        }}
        onClick={() => {
          onClickPlay(item);
        }}
      >
        <div>{item.name || '-'}</div>
        <div className="AlbumItem_Sub">
          {item.year || '-'} / {item.songs.length} song(s)
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.el.addEventListener('mouseenter', this._handleMouseEnter, false);
  }

  componentWillUnmount() {
    this.el.removeEventListener('mouseenter', this._handleMouseEnter, false);
  }
}

export default observer(AlbumItem);
