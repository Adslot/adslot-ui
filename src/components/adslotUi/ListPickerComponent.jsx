import _ from 'lodash';
import React, { PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import ListPickerPure from 'components/adslotUi/ListPickerPureComponent';
import Modal from 'react-bootstrap/lib/Modal';
import SplitPane from 'components/adslotUi/SplitPaneComponent';
import FlexibleSpacer from 'components/alexandria/FlexibleSpacer/component';
import Grid from 'components/alexandria/Grid/component';
import GridRow from 'components/alexandria/GridRow/component';
import GridCell from 'components/alexandria/GridCell/component';
import SvgSymbol from 'components/alexandria/SvgSymbolComponent';

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
    ]) { this[methodName] = this[methodName].bind(this); }

    this.state = {};
  }

  componentDidMount() { this.loadData(); }

  getApplyButtonState(selectedItems) {
    if (this.props.allowEmptySelection) return false;

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
    if (!this.props.allowMultiSelection) selectedItems.length = 0;

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
        emptySvgSymbol={props.emptySvgSymbol}
        deselectItem={this.deselectItem}
        labelFormatter={props.labelFormatter}
        addonFormatter={props.addonFormatter}
        itemHeaders={props.itemHeaders}
        items={props.items}
        itemType={props.itemType}
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
            <div className="listpicker-component-body">{listPickerPureElement}</div>
          :
            <div className="listpicker-component-body-split">
              <SplitPane dts={_.kebabCase(props.itemInfo.label)}>
                <Grid>
                  <GridRow type="header">
                    <GridCell>{props.itemInfo.label}</GridCell>
                  </GridRow>
                  {_.map(props.itemInfo.properties, (property) =>
                    <GridRow key={property.label} horizontalBorder={false}>
                      <GridCell classSuffixes={['label']}>{property.label}</GridCell>
                      <GridCell
                        classSuffixes={['value']}
                        dts={_.kebabCase(property.label)}
                        stretch
                      >
                        {property.value}
                      </GridCell>
                    </GridRow>
                  )}
                </Grid>
                <FlexibleSpacer />
              </SplitPane>
              <SplitPane>
                {listPickerPureElement}
                <FlexibleSpacer />
              </SplitPane>
            </div>
          }
          {props.modalFootnote ? <div className="listpicker-component-footnote">{props.modalFootnote}</div> : null}
        </Modal.Body>
        <Modal.Footer>
          {_.isEmpty(props.linkButtons) ? null :
            <div className="pull-left">
              {_.map(props.linkButtons, (linkButton) =>
                <Button key={linkButton.label} className="btn-inverse" href={linkButton.href}>
                  {linkButton.label}
                </Button>
              )}
            </div>
          }
          <Button className="btn-inverse" onClick={this.cancelAction} data-test-selector="listpicker-cancel-button">
            Cancel
          </Button>
          <Button
            bsStyle="primary" onClick={this.applyAction} disabled={state.disableApplyButton}
            data-test-selector="listpicker-apply-button"
          >
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ListPickerComponent.displayName = 'AdslotUiListPickerComponent';

const itemProps = PropTypes.shape({
  id: PropTypes.number.isRequired,
});

ListPickerComponent.propTypes = {
  allowEmptySelection: PropTypes.bool.isRequired,
  allowMultiSelection: PropTypes.bool.isRequired,
  emptyIcon: PropTypes.string,
  emptyMessage: PropTypes.string,
  emptySvgSymbol: PropTypes.shape(SvgSymbol.propTypes),
  initialSelection: PropTypes.arrayOf(itemProps).isRequired,
  itemHeaders: PropTypes.shape({
    label: PropTypes.string,
    toggle: PropTypes.string,
    addon: PropTypes.string,
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
  items: PropTypes.arrayOf(itemProps).isRequired,
  itemType: PropTypes.string.isRequired,
  labelFormatter: PropTypes.func,
  addonFormatter: PropTypes.func,
  linkButtons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
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
  itemType: 'item',
  modalApply: () => { throw new Error('AdslotUi ListPicker needs a modalApply handler'); },

  modalClassName: 'listpicker-component',
  modalClose: () => { throw new Error('AdslotUi ListPicker needs a modalClose handler'); },

  modalTitle: 'Select Items',
  show: false,
};

export default ListPickerComponent;
