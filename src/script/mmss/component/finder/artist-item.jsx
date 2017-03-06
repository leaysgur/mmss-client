// @flow
import React from 'react';
import { observer } from 'mobx-react';


class ArtistItem extends React.Component {
  el: HTMLDivElement;
  _handleMouseEnter: () => void;
  props: {
    item: Artist;
    isSelected: boolean;
    onClick: (item: Artist) => void;
    onClickPlay: (item: Artist) => void;
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
        ref={(ref) => { this.el = ref; }}
        className={`ArtistItem ${isSelected ? '-selected' : ''}`}
      >
        <a className="ArtistItem_Action" href="#" onClick={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          onClickPlay(item);
        }}>[play]</a>
        <div className="ArtistItem_Body">
          <div>
          {item.name}
          </div>
          <div className="ArtistItem_Body_Sub">
            {item.albums.length} album(s)
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

export default observer(ArtistItem);
