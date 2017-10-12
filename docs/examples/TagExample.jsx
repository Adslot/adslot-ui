import _ from 'lodash';
import React from 'react';
import Example from '../components/Example';
import {
  Button,
  Tag,
} from '../../src/dist-entry';

const initialState = {
  tags: [
    {
      text: 'Display',
      accent: 'positive',
      id: '0ac7d4ce-af36-4fd9-b142-6377f8ad5f17',
      actionIconSvgHref: '/assets/svg-symbols.svg#cancel',
    },
    {
      text: 'Mobile',
      accent: 'pending',
      id: '5a884b04-223b-49d9-91d4-7abf10ea608f',
      actionIconSvgHref: '/assets/svg-symbols.svg#cancel',
    },
    {
      text: 'Run of Network',
      accent: 'negative',
      id: '87ecaf18-bf7f-472e-86e6-c91dd2700b78',
      actionIconSvgHref: '/assets/svg-symbols.svg#cancel',
    },
  ],
};

class TagExample extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    this.resetTags = this.resetTags.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
  }

  resetTags() {
    this.setState(initialState);
  }

  deleteTag(tagIdToDelete) {
    this.setState({
      tags: _.reject(this.state.tags, (tag) => tag.id === tagIdToDelete),
    });
  }

  render() {
    if (_.isEmpty(this.state.tags)) {
      return <Button className="btn-inverse" onClick={this.resetTags}>Reset tag example</Button>;
    }

    return (<div>{_.map(this.state.tags, (tag) => (
      <Tag
        key={tag.id}
        id={tag.id}
        accent={tag.accent}
        onAction={this.deleteTag}
        inverse
        actionIconSvgHref={tag.actionIconSvgHref}
      >{tag.text}</Tag>
    ))}</div>);
  }
}

const exampleProps = {
  componentName: 'Tag',
  notes: 'A tag is intended for use as a list of selected options such as search filters.',
  exampleCodeSnippet: `<Tag
  id="0ac7d4ce-af36-4fd9-b142-6377f8ad5f17"
  accent="positive"
  onAction={this.deleteTag}
  inverse
  actionIconSvgHref="/assets/svg-symbols.svg#cancel"
>Display</Tag>`,
  propTypes: [
    {
      propType: 'inverse',
      type: 'boolean',
    },
    {
      propType: 'id',
      type: 'string',
    },
    {
      propType: 'accent',
      type: 'string',
    },
    {
      propType: 'onAction',
      type: 'func',
    },
    {
      propType: 'actionIconSvgHref',
      type: 'string',
    },
  ],
};


export default () => <Example {...exampleProps}><TagExample /></Example>;
