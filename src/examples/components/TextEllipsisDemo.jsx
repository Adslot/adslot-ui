import moment from 'moment';
import React, { Component } from 'react';
import { TextEllipsis, Alert } from '../../components/distributionEntry';

class TextEllipsisDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      childrenData: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.' +
        '<span style="color: red">This is English</span>',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      childrenData: this.htmlCode.value,
    });
  }

  render() {
    return (
      <div className="text-ellipsis-demo">
        <Alert type="warning">HTML editor is only used for demo purpose</Alert>
        <br />
        <div className="row">
          <div className="col-xs-6">
            <div style={{ width: '200px' }}>
              <TextEllipsis>
                <span dangerouslySetInnerHTML={{ __html: this.state.childrenData }} key={moment()} />
              </TextEllipsis>
            </div>
          </div>
          <div className="col-xs-6">
            <textarea
              className="col-xs-12"
              ref={(ref) => { this.htmlCode = ref; }}
              defaultValue={this.state.childrenData}
            />
            <button className="btn btn-success pull-right" onClick={this.handleClick}>Change</button>
          </div>
        </div>
      </div>
    );
  }
}

export default TextEllipsisDemo;
