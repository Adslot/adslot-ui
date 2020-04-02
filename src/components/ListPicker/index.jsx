import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import ListPickerPure from '../ListPickerPure';
import SplitPane from '../SplitPane';
import FlexibleSpacer from '../FlexibleSpacer';
import Grid from '../Grid';
import GridRow from '../Grid/Row';
import GridCell from '../Grid/Cell';
import './styles.scss';

const isSubset = (array, subArray) =>
  _(subArray)
    .difference(array)
    .isEmpty();

class ListPickerComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    ['applyAction', 'cancelAction', 'deselectItem', 'getApplyButtonState', 'loadData', 'selectItem'].forEach(
      methodName => {
        this[methodName] = this[methodName].bind(this);
      }
    );

    this.state = {};
  }

  componentDidMount() {
    this.loadData();
  }

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
  }

  render() {
    const { selectedItems, disableApplyButton } = this.state;
    const {
      allowMultiSelection,
      emptyIcon,
      emptyMessage,
      emptySvgSymbol,
      labelFormatter,
      addonFormatter,
      itemHeaders,
      items,
      itemType,
      itemInfo,
      show,
      modalClassName,
      modalTitle,
      modalDescription,
      modalFootnote,
      linkButtons,
    } = this.props;

    const listPickerPureElement = (
      <ListPickerPure
        allowMultiSelection={allowMultiSelection}
        emptyIcon={emptyIcon}
        emptyMessage={emptyMessage}
        emptySvgSymbol={emptySvgSymbol}
        deselectItem={this.deselectItem}
        labelFormatter={labelFormatter}
        addonFormatter={addonFormatter}
        itemHeaders={itemHeaders}
        items={items}
        itemType={itemType}
        selectItem={this.selectItem}
        selectedItems={selectedItems}
      />
    );

    return (
      <Modal className={modalClassName} show={show} bsSize="large" keyboard={false}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalDescription ? <p>{modalDescription}</p> : null}
          {_.isEmpty(itemInfo) ? (
            <div className="listpicker-component-body">{listPickerPureElement}</div>
          ) : (
            <div className="listpicker-component-body-split">
              <SplitPane dts={_.kebabCase(itemInfo.label)}>
                <Grid>
                  <GridRow type="header">
                    <GridCell>{itemInfo.label}</GridCell>
                  </GridRow>
                  {_.map(itemInfo.properties, property => (
                    <GridRow key={property.label} horizontalBorder={false}>
                      <GridCell classSuffixes={['label']}>{property.label}</GridCell>
                      <GridCell classSuffixes={['value']} dts={_.kebabCase(property.label)} stretch>
                        {property.value}
                      </GridCell>
                    </GridRow>
                  ))}
                </Grid>
                <FlexibleSpacer />
              </SplitPane>
              <SplitPane>
                {listPickerPureElement}
                <FlexibleSpacer />
              </SplitPane>
            </div>
          )}
          {modalFootnote ? <div className="listpicker-component-footnote">{modalFootnote}</div> : null}
        </Modal.Body>
        <Modal.Footer>
          {_.isEmpty(linkButtons) ? null : (
            <div className="pull-left">
              {_.map(linkButtons, (linkButton, key) =>
                _.isObject(linkButton) && isSubset(_.keys(linkButton), ['label', 'href']) ? (
                  <Button key={linkButton.label} className="btn-inverse" href={linkButton.href}>
                    {linkButton.label}
                  </Button>
                ) : (
                  React.cloneElement(linkButton, { key })
                )
              )}
            </div>
          )}
          <Button className="btn-inverse" onClick={this.cancelAction} data-test-selector="listpicker-cancel-button">
            Cancel
          </Button>
          <Button
            bsStyle="primary"
            onClick={this.applyAction}
            disabled={disableApplyButton}
            data-test-selector="listpicker-apply-button"
          >
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ListPickerComponent.displayName = 'ListPickerComponent';

const itemProps = PropTypes.shape({
  id: PropTypes.number.isRequired,
});

const linkButtonsProps = PropTypes.arrayOf(
  PropTypes.oneOfType([
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    }),
    PropTypes.node,
  ])
);

ListPickerComponent.propTypes = {
  allowEmptySelection: PropTypes.bool,
  allowMultiSelection: PropTypes.bool,
  emptyIcon: PropTypes.string,
  emptyMessage: PropTypes.string,
  emptySvgSymbol: PropTypes.node,
  initialSelection: PropTypes.arrayOf(itemProps),
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
  items: PropTypes.arrayOf(itemProps),
  itemType: PropTypes.string,
  labelFormatter: PropTypes.func,
  addonFormatter: PropTypes.func,
  linkButtons: linkButtonsProps,
  modalApply: PropTypes.func,
  modalDescription: PropTypes.string,
  modalClassName: PropTypes.string,
  modalClose: PropTypes.func,
  modalFootnote: PropTypes.string,
  modalTitle: PropTypes.string,
  show: PropTypes.bool,
};

ListPickerComponent.defaultProps = {
  allowEmptySelection: true,
  allowMultiSelection: true,
  initialSelection: [],
  items: [],
  itemType: 'item',
  linkButtons: [],
  modalApply: () => {
    throw new Error('AdslotUi ListPicker needs a modalApply handler');
  },
  modalClassName: 'listpicker-component',
  modalClose: () => {
    throw new Error('AdslotUi ListPicker needs a modalClose handler');
  },
  modalTitle: 'Select Items',
  show: false,
};

export default ListPickerComponent;
