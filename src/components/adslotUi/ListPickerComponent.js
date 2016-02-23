import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import ListPickerPure from 'components/adslotUi/ListPickerPureComponent';
import SplitPane from 'components/adslotUi/SplitPaneComponent';
import { FlexSpacer, Grid, GridRow, GridCell } from 'alexandria-adslot';
import React, { PropTypes } from 'react';

require('styles/adslotUi/ListPicker.scss');

class ListPickerComponent extends React.Component {
  constructor(props) {
    super(props);
    for (const methodName of [
      'applyAction',
      'cancelAction',
      'deselectItem',
      'getApplyButtonState',
      'loadData',
      'selectItem',
    ]) {this[methodName] = this[methodName].bind(this);}

    this.state = {};
  }

  componentDidMount() {this.loadData();}

  getApplyButtonState(selectedItems) {
    if (this.props.allowEmptySelection) {return false;}

    return _.isEmpty(selectedItems);
  }

  loadData() {
    const selectedItems = _.clone(this.props.initialSelection);
    this.setState({
      selectedItems,
      disableApplyButton: this.getApplyButtonState(selectedItems),
    });
  }

  selectItem(item) {
    const { selectedItems } = this.state;
    if (!this.props.allowMultiSelection) {selectedItems.length = 0;}

    selectedItems.push(item);
    this.setState({
      selectedItems,
      disableApplyButton: this.getApplyButtonState(selectedItems),
    });
  }

  deselectItem(item) {
    const { selectedItems } = this.state;
    _.remove(selectedItems, { id: item.id });
    this.setState({
      selectedItems,
      disableApplyButton: this.getApplyButtonState(selectedItems),
    });
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

    const listPickerPureElement = (
      <ListPickerPure
        allowMultiSelection={props.allowMultiSelection}
        emptyIcon={props.emptyIcon}
        emptyMessage={props.emptyMessage}
        deselectItem={this.deselectItem}
        labelFormatter={props.labelFormatter}
        itemHeaders={props.itemHeaders}
        items={props.items}
        selectItem={this.selectItem}
        selectedItems={state.selectedItems}
      />
    );

    return (
      <Modal className={props.modalClassName} show={props.show} bsSize="large" keyboard={false}>
        <Modal.Header>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.modalDescription ? <p>{props.modalDescription}</p> : null}
          {_.isEmpty(props.itemInfo) ?
            <div className="listpicker-component-body">{listPickerPureElement}</div> :
            <div className="listpicker-component-body-split">
              <SplitPane>
                <Grid>
                  <GridRow type="header">
                    <GridCell>{props.itemInfo.label}</GridCell>
                  </GridRow>
                  {_.map(props.itemInfo.properties, (property) =>
                    <GridRow key={property.label} horizontalBorder={false}>
                      <GridCell classSuffixes={['label']}>{property.label}</GridCell>
                      <GridCell stretch classSuffixes={['value']}>{property.value}</GridCell>
                    </GridRow>
                  )}
                </Grid>
                <FlexSpacer />
              </SplitPane>
              <SplitPane>
                {listPickerPureElement}
                <FlexSpacer />
              </SplitPane>
            </div>
          }
          {props.modalFootnote ? <div className="listpicker-component-footnote">{props.modalFootnote}</div> : null}
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-inverse" onClick={this.cancelAction}>
            Cancel
          </Button>
          <Button bsStyle="primary" onClick={this.applyAction} disabled={state.disableApplyButton}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ListPickerComponent.displayName = 'AdslotUiListPickerComponent';

const itemType = PropTypes.shape({
  id: PropTypes.number.isRequired,
});

ListPickerComponent.propTypes = {
  allowEmptySelection: PropTypes.bool.isRequired,
  allowMultiSelection: PropTypes.bool.isRequired,
  emptyIcon: PropTypes.string,
  emptyMessage: PropTypes.string,
  initialSelection: PropTypes.arrayOf(itemType).isRequired,
  itemHeaders: PropTypes.shape({
    left: PropTypes.string,
    right: PropTypes.string,
  }),
  itemInfo: PropTypes.shape({
    label: PropTypes.string.isRequired,
    properties: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string,
      })
    ).isRequired,
  }),
  items: PropTypes.arrayOf(itemType).isRequired,
  labelFormatter: PropTypes.func,
  modalApply: PropTypes.func.isRequired,
  modalDescription: PropTypes.string,
  modalClassName: PropTypes.string,
  modalClose: PropTypes.func.isRequired,
  modalFootnote: PropTypes.string,
  modalTitle: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
};

ListPickerComponent.defaultProps = {
  allowEmptySelection: true,
  allowMultiSelection: true,
  initialSelection: [],
  items: [],
  modalApply: () => {throw new Error('AdslotUi ListPicker needs a modalApply handler');},

  modalClassName: 'listpicker-component',
  modalClose: () => {throw new Error('AdslotUi ListPicker needs a modalClose handler');},

  modalTitle: 'Select Items',
  show: false,
};

export default ListPickerComponent;
