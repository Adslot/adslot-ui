const { types: t } = require('@babel/core');

const svgTemplate = ({ imports, interfaces, componentName, props, jsx, exports }, { tpl }) => {
  jsx.openingElement.attributes.push(t.JSXSpreadAttribute(t.identifier('rest')));

  // adds: className={classnames('svg-icon', className)}
  // jsx.openingElement.attributes.push(
  //   t.jSXAttribute(
  //     t.JSXIdentifier('className'),
  //     t.jSXExpressionContainer(
  //       t.callExpression(t.identifier('classnames'), [t.stringLiteral('svg-icon'), t.identifier('className')])
  //     )
  //   )
  // );

  // alternative to above: add className={`svg-icon${className ? ` ${className}` : ''}`}
  const classNameAttribute = t.jsxAttribute(
    t.jsxIdentifier('className'),
    t.jsxExpressionContainer(
      t.templateLiteral(
        [
          t.templateElement({
            cooked: 'svg-icon',
            raw: 'svg-icon',
          }),
          t.templateElement({
            cooked: '',
            raw: '',
          }),
        ],
        [
          t.conditionalExpression(
            t.identifier('className'),
            t.templateLiteral(
              [
                t.templateElement({
                  cooked: ' ',
                  raw: ' ',
                }),
                t.templateElement(
                  {
                    cooked: '',
                    raw: '',
                  },
                  false
                ),
              ],
              [t.identifier('className')]
            ),
            t.stringLiteral('')
          ),
        ]
      )
    )
  );
  jsx.openingElement.attributes.push(classNameAttribute);

  props.push(t.identifier('props'));

  // note on the replace():
  // componentName is prefixed with Svg to prevent conflicts with JS globals
  // so we remove Svg from the beginning to generate the display name

  return tpl`${imports}
import PropTypes from 'prop-types';

// import classnames from 'classnames';
${interfaces}

const ${componentName} = (${props}) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props
  return ${jsx};
}

${componentName}.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};

${componentName}.displayName = '${componentName.replace(/^Svg/, '')}';

${exports}
  `;
};

module.exports = svgTemplate;
