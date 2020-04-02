import { ListPickerPure, SplitPane, Grid, GridCell, GridRow, SvgSymbol } from 'adslot-ui';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Radio from 'react-bootstrap/lib/Radio';
import ListPickerComponent from '.';
import { createAndMountComponent } from '../../lib/test-utils';
import ListPickerMocks from './mocks';

describe('ListPickerComponent', () => {
  const { getInitialSelection, userHeaders, users, labelFormatter, teamMember1, teamMember2 } = ListPickerMocks;

  const getListPickerPureElement = rootComponent => {
    const modalBodyElement = rootComponent.find(Modal.Body);
    return modalBodyElement.find(ListPickerPure);
  };

  it('should render with defaults', () => {
    const component = createAndMountComponent(<ListPickerComponent itemInfo={{}} />);
    expect(component.prop('className')).to.equal('listpicker-component');
    expect(component.type()).to.equal(Modal);
    expect(component.prop('show')).to.equal(false);
    expect(component.prop('bsSize')).to.equal('large');
    expect(component.prop('keyboard')).to.equal(false);

    const modalHeaderElement = component.find(Modal.Header);
    const modalTitleElement = modalHeaderElement.find(Modal.Title);
    const modalTitleText = modalTitleElement.children().text();
    expect(modalTitleText).to.equal('Select Items');

    const listPickerPureElement = getListPickerPureElement(component);
    expect(listPickerPureElement.prop('deselectItem')).to.be.a('function');
    expect(listPickerPureElement.prop('emptyIcon')).to.be.an('undefined');
    expect(listPickerPureElement.prop('emptyMessage')).to.equal('No items to select.');
    expect(listPickerPureElement.prop('emptySvgSymbol')).to.be.an('undefined');
    expect(listPickerPureElement.prop('labelFormatter')).to.be.a('function');
    expect(listPickerPureElement.prop('itemHeaders')).to.be.an('undefined');
    expect(listPickerPureElement.prop('itemType')).to.equal('item');
    expect(listPickerPureElement.prop('items')).to.deep.equal([]);
    expect(listPickerPureElement.prop('selectItem')).to.be.a('function');
    expect(listPickerPureElement.prop('selectedItems')).to.deep.equal([]);

    const modalFooterElement = component.find(Modal.Footer);
    const cancelButtonElement = modalFooterElement.find(Button).first();
    expect(cancelButtonElement.prop('className')).to.equal('btn-inverse');
    expect(cancelButtonElement.prop('onClick')).to.be.a('function');
    expect(cancelButtonElement.children().text()).to.equal('Cancel');

    const applyButtonElement = modalFooterElement.find(Button).last();
    expect(applyButtonElement.prop('bsStyle')).to.equal('primary');
    expect(applyButtonElement.prop('onClick')).to.be.a('function');
    expect(applyButtonElement.children().text()).to.equal('Apply');
    expect(applyButtonElement.prop('disabled')).to.equal(false);
  });

  it('should render with props', () => {
    const initialSelection = getInitialSelection();
    const props = {
      emptyMessage: 'No users.',
      emptySvgSymbol: <SvgSymbol href="/some.svg#id" />,
      initialSelection,
      items: users,
      itemHeaders: userHeaders,
      itemType: 'user',
      labelFormatter,
      linkButtons: [{ label: 'Create User', href: '#' }],
      modalDescription: 'Select users.',
      modalFootnote: 'You can select multiple users.',
      modalTitle: 'Select Users',
    };
    const component = createAndMountComponent(<ListPickerComponent {...props} />);
    expect(component.prop('className')).to.equal('listpicker-component');

    const modalHeaderElement = component.find(Modal.Header);
    const modalTitleElement = modalHeaderElement.find(Modal.Title);
    const modalTitleText = modalTitleElement.children().text();
    expect(modalTitleText).to.equal('Select Users');

    const modalBodyElement = component.find(Modal.Body);
    const modalDescriptionElement = modalBodyElement.find('p');
    const modalDescriptionText = modalDescriptionElement.text();
    expect(modalDescriptionText).to.equal('Select users.');

    const modalFootnoteElement = modalBodyElement.find('.listpicker-component-footnote');
    const modalFootnoteText = modalFootnoteElement.text();
    expect(modalFootnoteText).to.equal('You can select multiple users.');

    const listPickerPureElement = getListPickerPureElement(component);
    expect(listPickerPureElement.prop('selectedItems')).to.not.equal(initialSelection);
    expect(listPickerPureElement.prop('selectedItems')).to.deep.equal(initialSelection);
    expect(listPickerPureElement.prop('deselectItem')).to.be.a('function');
    expect(listPickerPureElement.prop('emptySvgSymbol')).to.be.an('object');
    expect(listPickerPureElement.prop('emptyMessage')).to.equal('No users.');
    expect(listPickerPureElement.prop('labelFormatter')).to.be.a('function');
    expect(listPickerPureElement.prop('itemHeaders')).to.deep.equal(userHeaders);
    expect(listPickerPureElement.prop('itemType')).to.equal('user');
    expect(listPickerPureElement.prop('items')).to.deep.equal(users);
    expect(listPickerPureElement.prop('selectItem')).to.be.a('function');
    expect(listPickerPureElement.prop('selectedItems')).to.deep.equal([teamMember2]);

    const modalFooterElement = component.find(Modal.Footer);
    const linkButtonElement = modalFooterElement.find(Button).first();
    expect(linkButtonElement.prop('className')).to.equal('btn-inverse');
    expect(linkButtonElement.prop('href')).to.equal('#');
    expect(linkButtonElement.prop('children')).to.equal('Create User');
  });

  it('should render with props for split pane', () => {
    const itemInfo = {
      label: 'User Details',
      properties: [{ label: 'Name', value: 'Jill Smith' }, { label: 'Age', value: '21' }],
    };
    const initialSelection = getInitialSelection();
    const props = {
      emptyIcon: '/some.png',
      emptyMessage: 'No users.',
      initialSelection,
      items: users,
      itemHeaders: userHeaders,
      itemInfo,
      itemType: 'user',
      labelFormatter,
      modalDescription: 'Select users.',
      modalFootnote: 'You can select multiple users.',
      modalTitle: 'Select Users',
    };
    const component = createAndMountComponent(<ListPickerComponent {...props} />);
    expect(component.prop('className')).to.equal('listpicker-component');

    const modalHeaderElement = component.find(Modal.Header);
    const modalTitleElement = modalHeaderElement.find(Modal.Title);
    const modalTitleText = modalTitleElement.children().text();
    expect(modalTitleText).to.equal('Select Users');

    const modalBodyElement = component.find(Modal.Body);
    const modalDescriptionElement = modalBodyElement.find('p');
    const modalDescriptionText = modalDescriptionElement.text();
    expect(modalDescriptionText).to.equal('Select users.');

    const modalFootnoteElement = modalBodyElement.find('.listpicker-component-footnote');
    const modalFootnoteText = modalFootnoteElement.text();
    expect(modalFootnoteText).to.equal('You can select multiple users.');

    const splitPaneElements = modalBodyElement.find(SplitPane);
    expect(splitPaneElements.first().prop('dts')).to.equal('user-details');
    const itemInfoGridElement = splitPaneElements.first().find(Grid);
    const itemInfoLabelElement = itemInfoGridElement
      .find(GridRow)
      .first()
      .find(GridCell);
    expect(itemInfoLabelElement.children().text()).to.equal('User Details');

    const itemInfoPropertyElements = itemInfoGridElement.find(GridRow);
    const firstItemInfoProperty = itemInfoPropertyElements.at(1).find(GridCell);
    const secondItemInfoProperty = itemInfoPropertyElements.at(2).find(GridCell);
    expect(
      firstItemInfoProperty
        .first()
        .children()
        .text()
    ).to.equal('Name');
    expect(
      firstItemInfoProperty
        .last()
        .children()
        .text()
    ).to.equal('Jill Smith');
    expect(firstItemInfoProperty.last().prop('dts')).to.equal('name');
    expect(
      secondItemInfoProperty
        .first()
        .children()
        .text()
    ).to.equal('Age');
    expect(
      secondItemInfoProperty
        .last()
        .children()
        .text()
    ).to.equal('21');
    expect(secondItemInfoProperty.last().prop('dts')).to.equal('age');

    const listPickerPureElement = splitPaneElements.find(ListPickerPure);
    expect(listPickerPureElement.prop('selectedItems')).to.not.equal(initialSelection);
    expect(listPickerPureElement.prop('selectedItems')).to.deep.equal(initialSelection);
    expect(listPickerPureElement.prop('deselectItem')).to.be.a('function');
    expect(listPickerPureElement.prop('emptyIcon')).to.equal('/some.png');
    expect(listPickerPureElement.prop('emptyMessage')).to.equal('No users.');
    expect(listPickerPureElement.prop('labelFormatter')).to.be.a('function');
    expect(listPickerPureElement.prop('itemHeaders')).to.deep.equal(userHeaders);
    expect(listPickerPureElement.prop('itemType')).to.equal('user');
    expect(listPickerPureElement.prop('items')).to.deep.equal(users);
    expect(listPickerPureElement.prop('selectItem')).to.be.a('function');
    expect(listPickerPureElement.prop('selectedItems')).to.deep.equal([teamMember2]);
  });

  it('should disable apply button for empty selection if `allowEmptySelection` is false', () => {
    const props = { allowEmptySelection: false, items: users };
    const component = createAndMountComponent(<ListPickerComponent {...props} />);
    const modalFooterElement = component.find(Modal.Footer);
    const applyButtonElement = modalFooterElement.find(Button).last();
    expect(applyButtonElement.prop('disabled')).to.equal(true);
  });

  it('should change `selectedItems` state after a `selectItem` action', () => {
    const props = { initialSelection: getInitialSelection(), items: users };
    const component = createAndMountComponent(<ListPickerComponent {...props} />);
    const listPickerPureElement = getListPickerPureElement(component);
    listPickerPureElement.props().selectItem(teamMember1);
    expect(listPickerPureElement.prop('selectedItems')).to.deep.equal([teamMember2, teamMember1]);
  });

  it('should only allow one selection if `allowMultiSelection` is false', () => {
    const props = {
      allowMultiSelection: false,
      initialSelection: getInitialSelection(),
      items: users,
    };
    const component = createAndMountComponent(<ListPickerComponent {...props} />);
    const listPickerPureElement = getListPickerPureElement(component);
    expect(listPickerPureElement.prop('selectedItems')).to.deep.equal([teamMember2]);

    listPickerPureElement.props().selectItem(teamMember1);
    expect(listPickerPureElement.prop('selectedItems')).to.deep.equal([teamMember1]);
  });

  it('should change `selectedItems` state after a `deselectItem` action', () => {
    const props = { initialSelection: getInitialSelection(), items: users };
    const component = createAndMountComponent(<ListPickerComponent {...props} />);
    const listPickerPureElement = getListPickerPureElement(component);
    listPickerPureElement.props().deselectItem(teamMember2);
    expect(listPickerPureElement.prop('selectedItems')).to.deep.equal([]);
  });

  it('should show modal when `show` is true', () => {
    const component = createAndMountComponent(<ListPickerComponent show />);
    expect(component.prop('show')).to.equal(true);
  });

  it('should hide modal when `show` is false', () => {
    const component = createAndMountComponent(<ListPickerComponent show={false} />);
    expect(component.prop('show')).to.equal(false);
  });

  it('should only call `modalApply` when we click Apply', () => {
    let applyCalls = null;
    let closeCalls = 0;
    const applyMock = selectedItems => {
      applyCalls = selectedItems;
    };

    const closeMock = () => {
      closeCalls += 1;
    };

    const props = {
      initialSelection: getInitialSelection(),
      modalApply: applyMock,
      modalClose: closeMock,
    };
    const component = createAndMountComponent(<ListPickerComponent {...props} />);
    const modalFooterElement = component.find(Modal.Footer);
    const applyButtonElement = modalFooterElement.find(Button).last();
    applyButtonElement.simulate('click');
    expect(applyCalls).to.deep.equal([teamMember2]);
    expect(closeCalls).to.equal(0);
  });

  it('should throw when we click Apply without a handler', () => {
    const component = createAndMountComponent(<ListPickerComponent />);
    const modalFooterElement = component.find(Modal.Footer);
    const applyButtonElement = modalFooterElement.find(Button).last();
    expect(applyButtonElement.prop('onClick')).to.throw('AdslotUi ListPicker needs a modalApply handler');
  });

  it('should call `modalClose` when we click Cancel', () => {
    let closeCalls = 0;
    const closeMock = () => {
      closeCalls += 1;
    };

    const component = createAndMountComponent(<ListPickerComponent modalClose={closeMock} />);
    const modalFooterElement = component.find(Modal.Footer);
    const cancelButtonElement = modalFooterElement.find(Button).first();
    cancelButtonElement.simulate('click');
    expect(closeCalls).to.equal(1);
  });

  it('should throw when we click Close without a handler', () => {
    const component = createAndMountComponent(<ListPickerComponent />);
    const modalFooterElement = component.find(Modal.Footer);
    const cancelButtonElement = modalFooterElement.find(Button).first();
    expect(cancelButtonElement.prop('onClick')).to.throw('AdslotUi ListPicker needs a modalClose handler');
  });

  describe('linkButtons', () => {
    const initialSelection = getInitialSelection();
    let props = null;

    beforeEach(() => {
      props = {
        emptyMessage: 'No users.',
        emptySvgSymbol: <SvgSymbol href="/some.svg#id" />,
        initialSelection,
        items: users,
        itemHeaders: userHeaders,
        itemType: 'user',
        labelFormatter,
        linkButtons: [{ label: 'Create User', href: '#' }],
        modalDescription: 'Select users.',
        modalFootnote: 'You can select multiple users.',
        modalTitle: 'Select Users',
      };
    });

    it('should render as node', () => {
      props.linkButtons = [<Radio />];
      const component = createAndMountComponent(<ListPickerComponent {...props} />);
      const modalFooterElement = component.find(Modal.Footer);
      const linkButtonContainer = modalFooterElement.find('.pull-left').first();
      expect(linkButtonContainer.find(Radio)).to.have.length(1);
    });

    it('should render as mixed nodes and buttons', () => {
      props.linkButtons = [{ label: 'Create User', href: '#' }, <Radio />];
      const component = createAndMountComponent(<ListPickerComponent {...props} />);
      const modalFooterElement = component.find(Modal.Footer);
      const linkButtonContainer = modalFooterElement.find('.pull-left').first();
      expect(linkButtonContainer.find(Radio)).to.have.length(1);
      expect(linkButtonContainer.find(Button)).to.have.length(1);

      const buttonElement = linkButtonContainer.find(Button);
      expect(buttonElement.prop('className')).to.equal('btn-inverse');
      expect(buttonElement.prop('href')).to.equal('#');
      expect(buttonElement.prop('children')).to.equal('Create User');
    });
  });
});
