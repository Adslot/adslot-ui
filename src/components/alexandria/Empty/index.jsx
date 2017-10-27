import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import SvgSymbolCircle from 'alexandria/SvgSymbol/Circle';
import './styles.scss';

const Empty = ({ collection, svgSymbol, text, hideIcon }) => {
  const classSuffixes = _.isEmpty(svgSymbol.classSuffixes) ?
    Empty.defaultProps.svgSymbol.classSuffixes :
    svgSymbol.classSuffixes;

  if (_.isEmpty(collection)) {
    return (
      <div className="empty-component">
        {
          hideIcon ? null :
          <SvgSymbolCircle
            href={svgSymbol.href}
            classSuffixes={classSuffixes}
          />
        }
        <div className="empty-component-text">{text}</div>
      </div>
    );
  }

  return <div />;
};

Empty.displayName = 'AlexandriaEmptyComponent';

Empty.propTypes = {
  collection: PropTypes.node,
  svgSymbol: PropTypes.shape(SvgSymbolCircle.propTypes),
  text: PropTypes.node, // can be string or, if you want rich formatting, a node
  hideIcon: PropTypes.bool,
};
Empty.defaultProps = {
  collection: null,
  svgSymbol: {
    classSuffixes: ['gray-darker', '70', 'circle'],
  },
  text: 'Nothing to show.',
  hideIcon: false,
};

export default Empty;
