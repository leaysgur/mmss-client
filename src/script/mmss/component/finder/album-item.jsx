// @flow
import React from 'react';
import { observer } from 'mobx-react';


class AlbumItem extends React.Component {
  el: HTMLDivElement;
  _handleMouseEnter: () => void;
  props: {
    item: Album;
    isSelected: boolean;
    onClick: (item: Album) => void;
    onClickPlay: (item: Album) => void;
  };

  constructor() {
    super();

    this._handleMouseEnter = () => {
      this.props.onClick(this.props.item);
    };
  }

  render() {
    const {
      item,
      isSelected,
      onClickPlay,
    } = this.props;

    return (
      <div
        className={`AlbumItem ${isSelected ? '-selected' : ''}`}
        ref={ref => { this.el = ref; }}
      >
        <a className="AlbumItem_Action" href="#" onClick={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          onClickPlay(item);
        }}>[play]</a>
        <div className="AlbumItem_Body">
          <div>
            {item.name}
          </div>
          <div className="AlbumItem_Body_Sub">
            {item.year || '-'} / {item.songs.length} song(s)
          </div>
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
