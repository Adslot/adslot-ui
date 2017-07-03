import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import Textarea from '.';

class TextareaExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maxLength: 5,
    };

    this.toggleMaxLength = this.toggleMaxLength.bind(this);
  }

  toggleMaxLength() {
    this.setState({
      maxLength: this.state.maxLength === 5 ? null : 5,
    });
  }

  render() {
    return (
      <div>
        <h2>Textarea</h2>
        <Textarea maxLength={this.state.maxLength} statusClass="pull-right" />
        <br />
        <Button className="btn-inverse" bsStyle="primary" onClick={this.toggleMaxLength}>Toggle max length</Button>
      </div>
    );
  }
}

export default TextareaExample;
