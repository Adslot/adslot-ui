import fs from 'node:fs';
import nodePath from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import { parse, traverse } from '@babel/core';
import generatorPkg from '@babel/generator';

const generate = generatorPkg.default;

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const generateOpts = {
  // retainLines: true,
};

export default function parsePropTypesVariables(relativePath, config = { debug: true }) {
  // this will contain our whole transformation
  let str = '';
  let replaceArgs = [];

  function getString() {
    config.debug && console.log(str);
    return str;
  }

  function clearString() {
    str = '';
  }

  function appendProperty(content, type) {
    config.debug && console.log(chalk.grey('  propType:'), chalk.whiteBright(content), chalk.yellow(`[${type}]\n`));
    str += `${content},`;
  }

  function parsePropTypesObject(propTypes, path) {
    let references = [];
    // class property static propTypes and regular propTypes assignment
    // need to traverse different levels of parentPath
    const pathToTraverse = path.parentPath.parentPath.parentPath || path.parentPath.parentPath;

    propTypes.properties?.forEach((prop, i) => {
      parseProperties(pathToTraverse, prop, i, path, references);
    });

    // re-traverse with the required
    // variable names / object keys.
    // replace any vars with their actual content
    pathToTraverse.traverse(updateVariable, references);

    const propTypesObj = `{
      ${getString()}
    }`;
    const replaceable = getReplaceable(propTypesObj);
    path.get('right').replaceWith(replaceable);
    // reset the string in case there's more than one
    // component in the file
    clearString();
  }

  function parseProperties(pathToTraverse, property, replaceIndex, path, references) {
    const val = property.argument || property.value;
    let replaced;
    if (val) {
      // this aims to cover instances where a variable is in a PropType function e.g
      // PropTypes.oneOf(theme) / PropTypes.oneOfType([triggerPropTypes, PropTypes.arrayOf(triggerPropTypes)])
      if (
        val.type === 'CallExpression' ||
        (val.type === 'MemberExpression' && val?.object?.type === 'CallExpression') ||
        (val.type === 'MemberExpression' && val?.object?.name !== 'PropTypes')
      ) {
        let value = val;
        if (val.type === 'MemberExpression') {
          value = val.object;
        }
        value.arguments?.forEach((arg) => {
          const name = arg.object?.name || arg.name;

          if (arg.type === 'Identifier' || (arg.type === 'MemberExpression' && arg.object?.name !== 'PropTypes')) {
            // gets the variable's code
            // and puts it in the replaceArgs array
            // not sure if we can just re-traverse the whole program here instead?
            pathToTraverse.traverse(updateVariable, [
              {
                name,
                type: arg.type,
                key: property.value && property.key.name,
                replaceIndex,
                replace: name,
                path: path.get('right'),
              },
            ]);

            // replace the identifier
            path.traverse(traverseHandler, {
              name,
              caller: value.callee?.property?.name,
            });
          }

          // check through array
          if (arg.type === 'ArrayExpression') {
            arg.elements &&
              arg.elements.forEach((el) => {
                if (el.type === 'Identifier') {
                  // get the variable's code
                  pathToTraverse.traverse(updateVariable, [
                    {
                      name: el.name,
                      type: el.type,
                      key: property.value && property.key.name,
                      replaceIndex,
                      replace: el.name,
                      path: path.get('right'),
                    },
                  ]);

                  // replace identifier
                  path.traverse(traverseHandler, {
                    name: el.name,
                  });
                }
              });
          }
        });
        // append the code after having done replacements in traverseHandler
        appendProperty(generate(property).code, 'callExpression');
        replaced = true;
      }
      if (val.type === 'MemberExpression' && !replaced) {
        appendProperty(generate(property).code, 'MemberExpression');
      } else if (val.type === 'StringLiteral' || val.type === 'TemplateLiteral') {
        // noop
      } else {
        references.push({
          name: val.name,
          type: property.type,
          key: property.value && property.key.name,
          path: path.get('right'),
        });
      }
    }
  }

  const babelParse = {
    visitor: {
      // look for propTypes class property
      ClassProperty: {
        exit(path, state) {
          if (isPropTypesClassProperty(path)) {
            config.debug && console.log(chalk.cyan.bold(path.parentPath.parentPath?.node?.id?.name));
            parsePropTypesObject(path.node, path);
          }
        },
      },
      // look for .propTypes assignment
      AssignmentExpression: {
        exit(path, state) {
          if (isPropTypesAssignment(path)) {
            config.debug && console.log(chalk.cyan.bold(path.get('left')?.node?.object?.name));
            // mapp the object properties of the X.propTypes object
            parsePropTypesObject(path.get('right').node, path);
          }
        },
      },
    },
  };

  // replace any identifiers that match
  // those we want to replace
  const traverseHandler = {
    Identifier: {
      exit(path) {
        // look for this identifier in our replace array
        const ctx = replaceArgs.find(({ name }) => name && name === path.node.name);
        // don't replace the variable identifier itself

        if (ctx && path.parentPath.type !== 'VariableDeclarator') {
          // replace variable with variable's contents
          // get the object property that this var is in
          const property = path.findParent((p) => p.isObjectProperty());

          const parentAssignment = path.find((p) => p.isAssignmentExpression());
          const parentProperty = path.find((p) => p.isClassProperty());

          // make sure we are actually in a propTypes definition object
          if (
            property &&
            ((parentAssignment && isPropTypesAssignment(parentAssignment)) ||
              (parentProperty && isPropTypesClassProperty(parentProperty)))
          ) {
            path.replaceWithSourceString(ctx.code);
          }
        }
      },
    },
  };

  const updateVariable = {
    // if it's an imported variable
    // try to get its value from the file it's imported from
    'ImportSpecifier|ImportDefaultSpecifier'(path) {
      const ctx = this.find(({ name }) => name && name === path.node.local.name);
      if (ctx) {
        config.debug &&
          console.log(`attempting to get ${ctx.name} from source file`, path.parentPath.node.source.value);
        const sourceFileString = getFileSource(path.parentPath.node.source.value, relativePath);
        if (sourceFileString) {
          config.debug && console.log(`got ${ctx.name} from source file`, path.parentPath.node.source.value);
          const ast = parse(sourceFileString, {
            // presets: ['@babel/preset-env', '@babel/preset-react'],
            // parserOpts: {
            // }
          });

          traverse(ast, updateVariable, undefined, [
            {
              ...ctx,
              path: null,
            },
          ]);
        }
      }
    },
    VariableDeclarator(path) {
      const possibleName = path.node?.id?.name || path.node?.local?.name;
      // find a matching variable in our references array (this)
      const ctx = this.find(({ name }) => name && name === possibleName);

      if (ctx) {
        // make object expression strings and add them to the global
        // str variable
        let expression = '';
        let type;
        if (path.node.init.type === 'ObjectExpression') {
          ctx.key = undefined;
        }

        if (typeof ctx.replace !== 'undefined') {
          const code = generate(path.node.init, generateOpts).code;

          config.debug && console.log(`replacing var ${possibleName}: ${code}`);

          replaceArgs.push({
            name: ctx.replace,
            key: ctx.key,
            code,
          });
        } else if (ctx.key) {
          type = 'Variable';
          expression = `${ctx.key}: ${generate(path.node.init, generateOpts).code}`;
        } else {
          // assuming if there's no key it's a
          // SpreadElement, so map through its properties
          // expression = path.get("init").getSource();

          expression = `${path
            .get('init')
            .get('properties')
            .map((prop) => {
              if (prop.type === 'SpreadElement') {
                type = 'SpreadElement';

                // get the value of the spread element
                path.parentPath.parentPath.traverse(updateVariable, [
                  {
                    name: prop.node.argument.name,
                  },
                ]);
                return '';
              } else {
                type = 'Object';
                return generate(prop.node, generateOpts).code;
              }
            })}`;
        }
        // add the expression to the global str
        expression.length && appendProperty(expression, type);
      }
    },
  };
  return babelParse;
}

function getJsOrJsxFileString(sourcePath) {
  try {
    const file = fs.existsSync(sourcePath + '.js', 'utf-8')
      ? fs.readFileSync(sourcePath + '.js', 'utf-8')
      : fs.readFileSync(sourcePath + '.jsx', 'utf-8');
    return file.toString();
  } catch (error) {
    console.log(chalk.red(error));
  }
}

function getFileSource(source, relativePath) {
  if (!source || !source.startsWith('.')) return null;
  let sourcePath = nodePath.join(__dirname, relativePath, source);
  // if it's a directory, get the index file
  if (fs.existsSync(sourcePath)) {
    return getJsOrJsxFileString(sourcePath + '/index');
  }
  return getJsOrJsxFileString(sourcePath);
}

// like node.replaceWithString but doesn't strip comments
function getReplaceable(replacement) {
  try {
    replacement = `(${replacement})`;
    replacement = parse(replacement);
  } catch (err) {
    throw err;
  }
  replacement = replacement.program.body[0].expression;
  return replacement;
}

function isAssignment(path, match) {
  return (
    path.get('left').isMemberExpression() &&
    path.get('left').node.property &&
    path.get('left').node.property.name === match
  );
}

function isPropTypesAssignment(path) {
  return isAssignment(path, 'propTypes');
}

function isPropTypesClassProperty(path) {
  return path.isClassProperty() && path.node?.key?.name === 'propTypes';
}
