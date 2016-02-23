/* eslint-env node, mocha */
/* global expect */

import Button from 'react-bootstrap/lib/Button';
import ProductListPickerComponent from 'components/adslotUi/ProductListPickerComponent';
import Modal from 'react-bootstrap/lib/Modal';
import React from 'react';
import { createAndMountComponent } from 'testHelpers/shallowRenderHelpers';
import { Grid } from 'alexandria-adslot';

describe('ProductListPickerComponent', () => {
  const product1 = { id: 1, name: 'Run of Site' };

  const product2 = { id: 2, name: 'Homepage' };

  const productInfo = {
    name: 'Ad Hoc Product',
    siteName: 'Publisher Website',
    type: 'CPM',
    device: 'Desktop',
    geometry: ['300 × 250', '728 × 90'],
  };

  const getListPickerPureElement = (rootComponent) => {
    const modalBodyElement = rootComponent.props.children[1];
    return modalBodyElement.props.children[0].props.children[1].props.children;
  };

  const getProductInfoGridElement = (rootComponent) => {
    const modalBodyElement = rootComponent.props.children[1];
    return modalBodyElement.props.children[0].props.children[0].props.children;
  };

  it('should render with defaults', () => {
    const component = createAndMountComponent(ProductListPickerComponent);
    expect(component.props.className).to.equal('productlistpicker-component');
    expect(component.type).to.equal((<Modal />).type);
    expect(component.props.show).to.equal(false);
    expect(component.props.bsSize).to.equal('large');
    expect(component.props.keyboard).to.equal(false);

    const modalHeaderElement = component.props.children[0];
    expect(modalHeaderElement.type).to.equal((<Modal.Header />).type);
    const modalTitleElement = modalHeaderElement.props.children;
    expect(modalTitleElement.type).to.equal((<Modal.Title />).type);
    const modalTitleText = modalTitleElement.props.children;
    expect(modalTitleText).to.equal('Select Product');

    const modalBodyElement = component.props.children[1];
    expect(modalBodyElement.type).to.equal((<Modal.Body />).type);

    const productInfoGridElement = getProductInfoGridElement(component);
    expect(productInfoGridElement.type).to.equal((<Grid />).type);

    const listPickerPureElement = getListPickerPureElement(component);
    expect(listPickerPureElement.type.name).to.equal('ListPickerPureComponent');

    expect(listPickerPureElement.props.deselectItem).to.be.a('function');
    expect(listPickerPureElement.props.labelFormatter).to.be.a('function');
    expect(listPickerPureElement.props.itemHeaders).to.deep.equal({ left: 'Select a product' });
    expect(listPickerPureElement.props.items).to.deep.equal([]);
    expect(listPickerPureElement.props.selectItem).to.be.a('function');
    expect(listPickerPureElement.props.selectedItems).to.deep.equal([]);

    const modalFooterElement = component.props.children[2];
    expect(modalFooterElement.type).to.equal((<Modal.Footer />).type);

    const cancelButtonElement = modalFooterElement.props.children[0];
    expect(cancelButtonElement.type).to.equal((<Button />).type);
    expect(cancelButtonElement.props.className).to.equal('btn-inverse');
    expect(cancelButtonElement.props.onClick).to.be.a('function');
    expect(cancelButtonElement.props.children).to.equal('Cancel');

    const applyButtonElement = modalFooterElement.props.children[1];
    expect(applyButtonElement.type).to.equal((<Button />).type);
    expect(applyButtonElement.props.bsStyle).to.equal('primary');
    expect(applyButtonElement.props.onClick).to.be.a('function');
    expect(applyButtonElement.props.children).to.equal('Apply');
    expect(applyButtonElement.props.disabled).to.equal(true);
  });

  it('should render with props', () => {
    const component = createAndMountComponent(ProductListPickerComponent, {
      emptyMessage: 'No products.',
      initialSelection: product1,
      modalFootnote: 'You can only select one product.',
      modalTitle: 'Select Product',
      productInfo,
      products: [product1, product2],
    });
    expect(component.props.className).to.equal('productlistpicker-component');

    const modalHeaderElement = component.props.children[0];
    const modalTitleElement = modalHeaderElement.props.children;
    const modalTitleText = modalTitleElement.props.children;
    expect(modalTitleText).to.equal('Select Product');

    const modalBodyElement = component.props.children[1];
    const modalFootnoteElement = modalBodyElement.props.children[1];
    const modalFootnoteText = modalFootnoteElement.props.children;
    expect(modalFootnoteText).to.equal('You can only select one product.');

    const productInfoGridElement = getProductInfoGridElement(component);
    expect(productInfoGridElement.type).to.equal((<Grid />).type);

    const productInfoPropertyElements = productInfoGridElement.props.children[1].props.children.props.children;
    const productInfoNameElement = productInfoPropertyElements[0];
    expect(productInfoNameElement.props.children[1].props.children).to.equal(productInfo.name);
    const productInfoSiteElement = productInfoPropertyElements[1];
    expect(productInfoSiteElement.props.children[1].props.children).to.equal(productInfo.siteName);
    const productInfoTypeElement = productInfoPropertyElements[2];
    expect(productInfoTypeElement.props.children[1].props.children).to.equal(productInfo.type);
    const productInfoDeviceElement = productInfoPropertyElements[3];
    expect(productInfoDeviceElement.props.children[1].props.children).to.equal(productInfo.device);
    const productInfoSizeElement = productInfoPropertyElements[4];
    expect(productInfoSizeElement.props.children[1].props.children).to.equal(productInfo.geometry.join(', '));
    const productInfoClassificationEl = productInfoPropertyElements[5];
    expect(productInfoClassificationEl.props.children[1].props.children).to.equal(productInfo.classification);
    const productInfoPositionElement = productInfoPropertyElements[6];
    expect(productInfoPositionElement.props.children[1].props.children).to.equal(productInfo.position);

    const listPickerPureElement = getListPickerPureElement(component);
    expect(listPickerPureElement.type.name).to.equal('ListPickerPureComponent');
    expect(listPickerPureElement.props.selectedItems).to.not.equal([product1]);
    expect(listPickerPureElement.props.selectedItems).to.deep.equal([product1]);

    expect(listPickerPureElement.props.deselectItem).to.be.a('function');
    expect(listPickerPureElement.props.emptyMessage).to.equal('No products.');
    expect(listPickerPureElement.props.labelFormatter).to.be.a('function');
    expect(listPickerPureElement.props.labelFormatter(product1)).to.equal(product1.name);
    expect(listPickerPureElement.props.itemHeaders).to.deep.equal({ left: 'Select a product' });
    expect(listPickerPureElement.props.items).to.deep.equal([product1, product2]);
    expect(listPickerPureElement.props.selectItem).to.be.a('function');
    expect(listPickerPureElement.props.selectedItems).to.deep.equal([product1]);
  });

  it('should disable apply button for empty selection', () => {
    const component = createAndMountComponent(ProductListPickerComponent, {
      products: [product1, product2],
    });

    const modalFooterElement = component.props.children[2];
    const applyButtonElement = modalFooterElement.props.children[1];

    expect(applyButtonElement.props.disabled).to.equal(true);
  });

  it('should change `selectedItems` state after a `selectItem` action', () => {
    const component = createAndMountComponent(ProductListPickerComponent, {
      initialSelection: product1,
      products: [product1, product2],
    });
    const listPickerPureElement = getListPickerPureElement(component);
    listPickerPureElement.props.selectItem(product2);

    expect(listPickerPureElement.props.selectedItems).to.deep.equal([product2]);
  });

  it('should show modal when `show` is true', () => {
    const component = createAndMountComponent(ProductListPickerComponent, { show: true });
    expect(component.props.show).to.equal(true);
  });

  it('should hide modal when `show` is false', () => {
    const component = createAndMountComponent(ProductListPickerComponent, { show: false });
    expect(component.props.show).to.equal(false);
  });

  it('should call `modalApply` and `modalClose` when we click Apply', () => {
    let applyCalls = null;
    let closeCalls = 0;
    const applyMock = (selectedItems) => {applyCalls = selectedItems;};

    const closeMock = () => {closeCalls += 1;};

    const component = createAndMountComponent(ProductListPickerComponent, {
      initialSelection: product1,
      modalApply: applyMock,
      modalClose: closeMock,
    });

    const modalFooterElement = component.props.children[2];
    const applyButtonElement = modalFooterElement.props.children[1];
    applyButtonElement.props.onClick();

    expect(applyCalls).to.deep.equal(product1);
    expect(closeCalls).to.equal(1);
  });

  it('should throw when we click Apply without a handler', () => {
    const component = createAndMountComponent(ProductListPickerComponent);

    const modalFooterElement = component.props.children[2];
    const applyButtonElement = modalFooterElement.props.children[1];
    expect(applyButtonElement.props.onClick).to.throw('AdslotUi ProductListPicker needs a modalApply handler');
  });

  it('should call `modalClose` when we click Cancel', () => {
    let closeCalls = 0;
    const closeMock = () => {closeCalls += 1;};

    const component = createAndMountComponent(ProductListPickerComponent, {
      modalClose: closeMock,
    });

    const modalFooterElement = component.props.children[2];
    const cancelButtonElement = modalFooterElement.props.children[0];

    cancelButtonElement.props.onClick();

    expect(closeCalls).to.equal(1);
  });

  it('should throw when we click Close without a handler', () => {
    const component = createAndMountComponent(ProductListPickerComponent);

    const modalFooterElement = component.props.children[2];
    const cancelButtonElement = modalFooterElement.props.children[0];
    expect(cancelButtonElement.props.onClick).to.throw('AdslotUi ProductListPicker needs a modalClose handler');
  });
});
