import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Card, Pill } from 'adslot-ui';
import idPropType from '../../prop-types/idPropType';
import SmallTile from './SmallTile';
import './styles.scss';

export const TileTemplate = ({ type, item }) => {
  const { id, classSuffix, title, subTitle, logo, onTileClick, onTileHover, tags, content } = item;
  const baseClass = type === 'large' ? 'aui--large-tile' : 'aui--standard-tile';
  const tileClassNames = classNames(baseClass, { [`${baseClass}-${classSuffix}`]: classSuffix });
  const tileActionClassNames = classNames(
    [`${baseClass}-container`],
    { [`${baseClass}-clickable`]: onTileClick && !onTileHover },
    { [`${baseClass}-on-hover`]: onTileHover }
  );

  return (
    <Card.Container key={id} className={tileClassNames}>
      <div className={tileActionClassNames} onClick={onTileClick && !onTileHover ? () => onTileClick(id) : () => {}}>
        <Card.Content>
          <div className={`${baseClass}-logo`}>{logo ? <img src={logo} alt={`${id}-logo`} /> : ''}</div>
        </Card.Content>
        <Card.Content>
          <div className={`${baseClass}-tags`}>
            {_.map(tags, tag => (
              <Pill
                key={tag.id}
                id={tag.id}
                classSuffix={tag.classSuffix}
                onClick={!onTileHover ? () => tag.onTagClick(tag.id) : () => {}}
              >
                {tag.name}
              </Pill>
            ))}
          </div>
        </Card.Content>
        <Card.Content>
          <div className={`${baseClass}-title`}>{title || ''}</div>
        </Card.Content>
        <Card.Content>
          <div className={`${baseClass}-subtitle`}>{subTitle || ''}</div>
        </Card.Content>
        <Card.Content className={`${baseClass}-content`}>{content || ''}</Card.Content>
        {onTileHover ? <div className={`${baseClass}-hover-content`}>{onTileHover}</div> : null}
      </div>
    </Card.Container>
  );
};

const StandardTile = ({ item }) => <TileTemplate type="standard" item={item} />;
const LargeTile = ({ item }) => <TileTemplate type="large" item={item} />;

StandardTile.propTypes = {
  item: PropTypes.shape({
    id: idPropType.isRequired,
    classSuffix: PropTypes.string,
    title: PropTypes.node,
    subTitle: PropTypes.string,
    logo: PropTypes.string,
    onTileClick: PropTypes.func,
    onTileHover: PropTypes.node,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: idPropType.isRequired,
        name: PropTypes.string,
        classSuffix: PropTypes.string,
        onTagClick: PropTypes.func,
      })
    ),
    content: PropTypes.node,
  }).isRequired,
};

LargeTile.propTypes = {
  item: PropTypes.shape({
    id: idPropType.isRequired,
    classSuffix: PropTypes.string,
    title: PropTypes.node,
    subTitle: PropTypes.string,
    logo: PropTypes.string,
    onTileClick: PropTypes.func,
    onTileHover: PropTypes.node,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: idPropType.isRequired,
        name: PropTypes.string,
        classSuffix: PropTypes.string,
        onTagClick: PropTypes.func,
      })
    ),
    content: PropTypes.node,
  }).isRequired,
};

const Tile = {};
Tile.Small = SmallTile;
Tile.Standard = StandardTile;
Tile.Large = LargeTile;

export default Tile;
