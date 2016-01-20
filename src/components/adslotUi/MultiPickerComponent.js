import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import MultiPickerPure from 'components/adslotUi/MultiPickerPureComponent';
import React, { PropTypes } from 'react';

class MultiPickerComponent extends React.Component {
  constructor(props) {
    super(props);
    for (const methodName of [
      'applyAction',
      'cancelAction',
      'deselectItem',
      'loadData',
      'selectItem',
    ]) {this[methodName] = this[methodName].bind(this);}

    this.loadData();
  }

  loadData() {
    this.state = { selectedItems: this.props.initialSelection };
  }

  selectItem(item) {
    const { selectedItems } = this.state;
    selectedItems.push(item);
    this.setState({ selectedItems });
  }

  deselectItem(item) {
    const { selectedItems } = this.state;
    _.remove(selectedItems, { id: item.id });
    this.setState({ selectedItems });
  }

  cancelAction() {
    this.props.modalClose();
    this.loadData();
  }

  applyAction() {
    this.props.modalApply(this.state.selectedItems);
    this.props.modalClose();
  }

  render() {
    const { state, props } = this;

    return (
      <Modal className={props.modalClassName} show={props.show} bsSize="large" keyboard={false}>
        <Modal.Header>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{props.modalDescription}</p>
          <MultiPickerPure
            deselectItem={this.deselectItem}
            labelFormatter={props.labelFormatter}
            itemHeaders={props.itemHeaders}
            items={props.items}
            selectItem={this.selectItem}
            selectedItems={state.selectedItems}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-inverse" onClick={this.cancelAction}>
            Cancel
          </Button>
          <Button bsStyle="primary" onClick={this.applyAction}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

MultiPickerComponent.displayName = 'AdslotUiMultiPickerComponent';

const itemType = PropTypes.shape({
  id: PropTypes.number.isRequired,
});

MultiPickerComponent.propTypes = {
  initialSelection: PropTypes.arrayOf(itemType).isRequired,
  itemHeaders: PropTypes.shape({
    left: PropTypes.string,
    right: PropTypes.string,
  }),
  items: PropTypes.arrayOf(itemType).isRequired,
  labelFormatter: PropTypes.func,
  modalApply: PropTypes.func.isRequired,
  modalDescription: PropTypes.string,
  modalClassName: PropTypes.string,
  modalClose: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
};

MultiPickerComponent.defaultProps = {
  initialSelection: [],
  items: [],
  modalApply: () => {throw new Error('AdslotUi MultiPicker needs a modalApply handler');},

  modalClassName: 'multipicker-component',
  modalClose: () => {throw new Error('AdslotUi MultiPicker needs a modalClose handler');},

  modalDescription: 'Select items.',
  modalTitle: 'Select Items',
  show: false,
};

export default MultiPickerComponent;
