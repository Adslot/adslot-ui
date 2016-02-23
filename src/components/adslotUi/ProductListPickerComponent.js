import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import ListPickerPure from 'components/adslotUi/ListPickerPureComponent';
import SplitPane from 'components/adslotUi/SplitPaneComponent';
import { Grid, GridRow, GridCell } from 'alexandria-adslot';
import React, { PropTypes } from 'react';

require('styles/adslotUi/ProductListPicker.scss');

class ProductListPickerComponent extends React.Component {
  constructor(props) {
    super(props);
    for (const methodName of [
      'applyAction',
      'cancelAction',
      'getApplyButtonState',
      'loadData',
      'selectItem',
    ]) {this[methodName] = this[methodName].bind(this);}

    this.state = {};
  }

  componentDidMount() {this.loadData();}

  getApplyButtonState(selectedItems) {
    return _.isEmpty(selectedItems);
  }

  loadData() {
    const selectedItems = this.props.initialSelection ? [this.props.initialSelection] : [];
    this.setState({
      selectedItems,
      disableApplyButton: this.getApplyButtonState(selectedItems),
    });
  }

  selectItem(item) {
    const { selectedItems } = this.state;
    selectedItems[0] = item;
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
    this.props.modalApply(_.first(this.state.selectedItems));
    this.props.modalClose();
  }

  render() {
    const { state, props } = this;

    const productLabels = {
      name: 'Name',
      siteName: 'Site',
      type: 'Type',
      device: 'Device',
      geometry: 'Size',
      classification: 'Classification',
      position: 'Position',
    };

    return (
      <Modal className="productlistpicker-component" show={props.show} bsSize="large" keyboard={false}>
        <Modal.Header>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="productlistpicker-component-body">
            <SplitPane>

              <Grid>
                <GridRow type="header">
                  <GridCell>
                    Product Request
                  </GridCell>
                </GridRow>
                <GridRow>
                  <GridCell>
                    {_.map(productLabels, (label, key) =>
                      <div className="row">
                        <div className="col-xs-4 productlistpicker-component-product-label">{label}</div>
                        <div className="col-xs-8 productlistpicker-component-product-value">
                          {key === 'geometry' ? props.productInfo[key].join(', ') : props.productInfo[key]}
                        </div>
                      </div>
                    )}
                  </GridCell>
                </GridRow>
              </Grid>

            </SplitPane>

            <SplitPane>
              <ListPickerPure
                allowMultiSelection={false}
                emptyIcon={props.emptyIcon}
                emptyMessage={props.emptyMessage}
                deselectItem={_.noop}
                labelFormatter={props.labelFormatter}
                itemHeaders={{ left: 'Select a product' }}
                items={props.products}
                selectItem={this.selectItem}
                selectedItems={state.selectedItems}
              />
            </SplitPane>
          </div>

          {props.modalFootnote ?
            <div className="productlistpicker-component-footnote">{props.modalFootnote}</div> :
            null}
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

ProductListPickerComponent.displayName = 'AdslotUiProductListPickerComponent';

const productType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});

const productInfoType = PropTypes.shape({
  classification: PropTypes.string,
  device: PropTypes.string.isRequired,
  geometry: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string,
  siteName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});

ProductListPickerComponent.propTypes = {
  emptyIcon: PropTypes.string,
  emptyMessage: PropTypes.string,
  initialSelection: productType,
  labelFormatter: PropTypes.func,
  modalApply: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
  modalFootnote: PropTypes.string,
  modalTitle: PropTypes.string.isRequired,
  productInfo: productInfoType.isRequired,
  products: PropTypes.arrayOf(productType).isRequired,
  show: PropTypes.bool.isRequired,
};

ProductListPickerComponent.defaultProps = {
  labelFormatter: (product) => product.name,
  modalApply: () => {throw new Error('AdslotUi ProductListPicker needs a modalApply handler');},

  modalClose: () => {throw new Error('AdslotUi ProductListPicker needs a modalClose handler');},

  modalTitle: 'Select Product',
  productInfo: { geometry: [] },
  products: [],
  show: false,
};

export default ProductListPickerComponent;
