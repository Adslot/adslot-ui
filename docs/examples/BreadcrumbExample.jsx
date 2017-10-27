import React from 'react';
import _ from 'lodash';
import Example from '../components/Example';
import {
  Button,
  Breadcrumb,
} from '../../src/dist-entry';

const initialState = {
  breadcrumbNodes: [
    { id: 'db4e2cda-ffad-4763-a016-03619ccfd7c2', label: 'Australia' },
    { id: 'b1b8222c-172b-46f6-bc91-5b92ea9adcd5', label: 'Victoria' },
    { id: '9398d812-9e01-4a8b-9d3e-bc946218070b', label: 'Melbourne' },
  ],
};

class BreadcrumbExample extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    this.onClickHandler = this.onClickHandler.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  onClickHandler(nodeId) {
    if (nodeId === 'all') this.navigateToRootNode();
    else this.navigateToNode(nodeId);
  }

  navigateToRootNode() {
    this.setState({ breadcrumbNodes: [] });
  }

  resetState() { this.setState(initialState); }

  navigateToNode(nodeId) {
    const nodeIndex = _.findIndex(this.state.breadcrumbNodes, { id: nodeId });
    this.setState({ breadcrumbNodes: [].concat(this.state.breadcrumbNodes.slice(0, nodeIndex + 1)) });
  }

  render() {
    if (_.isEmpty(this.state.breadcrumbNodes)) {
      return <Button className="btn-inverse" onClick={this.resetState}>Reset breadcrumb example</Button>;
    }
    return (<Breadcrumb
      nodes={this.state.breadcrumbNodes}
      onClick={this.onClickHandler}
    />);
  }
}


const exampleProps = {
  componentName: 'Breadcrumb',
  exampleCodeSnippet: `
    <Breadcrumb
      nodes={this.state.breadcrumbNodes}
      onClick={this.onClickHandler}
    />
  `,
  propTypes: [
    {
      propType: 'nodes',
      type: 'arrayOf { string: id, string: label }',
    },
    {
      propType: 'onClick',
      type: 'func',
      note: 'onClick(nodeId)',
    },
    {
      propType: 'disabled',
      type: 'bool',
      defaultValue: 'false',
    },
  ],
};


export default () => <Example {...exampleProps}><BreadcrumbExample /></Example>;
