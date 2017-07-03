import Main from 'components/Main';
import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import {
  Accordion,
  Checkbox,
  ConfirmModal,
  DatePicker,
  ListPicker,
  Modal,
  Panel,
  Radio,
  RadioGroup,
  TreePickerSimplePure,
  UserListPicker,
} from 'components/distributionEntry';

describe('MainComponent', () => {
  let MainComponent;

  beforeEach(() => {
    MainComponent = shallow(<Main />);
  });

  it('should have its component name as default className', () => {
    expect(MainComponent.prop('className')).to.equal('index');
  });

  it('should have a modal component', () => {
    const modalComponent = MainComponent.find(Modal);
    expect(modalComponent.prop('bsSize')).to.equal('small');
    expect(modalComponent.prop('keyboard')).to.equal(false);
    expect(modalComponent.prop('backdrop')).to.equal(true);
  });

  it('should open the modal when clicking the button', () => {
    const modalButtonComponent = MainComponent.find('[data-test-selector="button-modal"]');
    let modalComponent = MainComponent.find(Modal);
    expect(modalComponent.prop('show')).to.equal(false);

    modalButtonComponent.simulate('click');
    modalComponent = MainComponent.find(Modal);
    expect(modalComponent.prop('show')).to.equal(true);
  });

  it('should open the confirm modal when clicking the button', () => {
    const modalButtonComponent = MainComponent.find('#button-confirm-modal');
    let modalComponent = MainComponent.find(ConfirmModal);
    expect(modalComponent.prop('show')).to.equal(false);

    modalButtonComponent.simulate('click');
    modalComponent = MainComponent.find(ConfirmModal);
    expect(modalComponent.prop('show')).to.equal(true);
  });

  it('should have a checkbox component', () => {
    const checkboxComponents = MainComponent.find(Checkbox);
    expect(checkboxComponents.first().prop('label')).to.equal('Unchecked');
  });

  it('should have a radio button component', () => {
    const radioGroupComponent = MainComponent.find(RadioGroup);
    const radioComponent = radioGroupComponent.find(Radio).first();
    expect(radioComponent.prop('label')).to.equal('Unchecked');
  });

  it('should toggle `panel.isCollapsed` on `Toggle Panel` click', () => {
    const panelElement = MainComponent.find(Panel);
    expect(MainComponent.state().panel.isCollapsed).to.equal(false);
    panelElement.prop('onClick')();
    expect(MainComponent.state().panel.isCollapsed).to.equal(true);
  });

  it('should toggle `accordionPanels[0].isCollapsed` on `Toggle Accordion Panel` click', () => {
    const accordionElement = MainComponent.find(Accordion);
    expect(MainComponent.state().accordionPanels[0].isCollapsed).to.equal(false);
    accordionElement.prop('onPanelClick')('1');
    expect(MainComponent.state().accordionPanels[0].isCollapsed).to.equal(true);
  });

  it('should render a TreePickerSimplePure', () => {
    const treePickerSimplePureElement = MainComponent.find(TreePickerSimplePure).first();
    expect(treePickerSimplePureElement.prop('selectedNodes')).to.have.length(0);
    expect(treePickerSimplePureElement.prop('subtree')).to.have.length(0);
  });

  it('should set the correct search values for TreePickerSimplePure', () => {
    const treePickerSimplePureElement = MainComponent.find(TreePickerSimplePure).first();
    MainComponent.setState({
      searchValue: 'Aus',
      subTree: [
        { id: '0', label: 'Northern Territory', path: [{ id: '10', label: 'AU' }], type: '' },
        { id: '1', label: 'Australian Capital Territory', path: [{ id: '10', label: 'AU' }], type: '' },
      ],
      treePickerPureSubtree: [],
    });
    treePickerSimplePureElement.prop('searchOnChange')('Sri');
    expect(treePickerSimplePureElement.prop('subtree')).to.have.length(0);
    treePickerSimplePureElement.prop('searchOnChange')('');
    expect(treePickerSimplePureElement.prop('subtree')).to.have.length(0);
  });

  it('should set the correct search values for TreePickerSimplePure without initial state', () => {
    const treePickerSimplePureElement = MainComponent.find(TreePickerSimplePure).last();
    expect(treePickerSimplePureElement.prop('subtree')).to.have.length(1);
    treePickerSimplePureElement.prop('searchOnChange')('Territory');
    treePickerSimplePureElement.prop('searchOnChange')('');
    expect(treePickerSimplePureElement.prop('subtree')).to.have.length(1);
  });

  it('should toggle `showListPickerModal` on `Open ListPicker` click', () => {
    const listPickerButtonElement = MainComponent.find('[data-test-selector="button-list-picker"]');
    listPickerButtonElement.simulate('click');
    const listPickerElement = MainComponent.find(ListPicker).first();
    expect(listPickerElement.prop('show')).to.equal(true);
  });

  it('should pass a custom labelFormatter into the ListPicker', () => {
    const listPickerElement = MainComponent.find(ListPicker).first();
    expect(listPickerElement.prop('labelFormatter')({ givenName: 'John', surname: 'Doe' })).to.equal('John Doe');
  });

  it('should pass a custom addonFormatter into the ListPicker', () => {
    const listPickerElement = MainComponent.find(ListPicker).first();
    expect(listPickerElement.prop('addonFormatter')().type).to.equal(Checkbox);
  });

  it('should pass a custom initialSelection into the ListPicker', () => {
    const listPickerElement = MainComponent.find(ListPicker).first();
    expect(listPickerElement.prop('initialSelection')).to.have.length(1);
  });

  it('should toggle `showSplitListPickerModal` on `Open Split ListPicker` click', () => {
    const splitListPickerButtonElement = MainComponent.find('[data-test-selector="button-split-list-picker"]');
    splitListPickerButtonElement.simulate('click');
    const splitListPickerElement = MainComponent.find(ListPicker).at(1);
    expect(splitListPickerElement.prop('show')).to.equal(true);
  });

  it('should toggle `showCustomFooterListPickerModal` on `Open ListPicker with custom footer` click', () => {
    const customFooterButtonElement = MainComponent.find('[data-test-selector="button-custom-footer-list-picker"]');
    customFooterButtonElement.simulate('click');
    const customFooterListPickerElement = MainComponent.find(ListPicker).at(2);
    expect(customFooterListPickerElement.prop('show')).to.equal(true);
  });

  it('should toggle `showUserListPickerModal` on `Open UserListPicker` click', () => {
    const userListPickerButtonElement = MainComponent.find('[data-test-selector="button-user-list-picker"]');
    userListPickerButtonElement.simulate('click');
    const userListPickerElement = MainComponent.find(UserListPicker);
    expect(userListPickerElement.prop('show')).to.equal(true);
  });

  it('should pass a custom avatarColor into the UserListPicker', () => {
    const userListPickerElement = MainComponent.find(UserListPicker);
    expect(userListPickerElement.props().avatarColor()).to.equal('cyan');
  });

  it('should pass a custom initialSelection into the UserListPicker', () => {
    const userListPickerElement = MainComponent.find(UserListPicker);
    expect(userListPickerElement.prop('initialSelection')).to.have.length(1);
  });

  it('should toggle `onChange` on `Open DatePicker` change', () => {
    MainComponent.setState({ startDate: moment() });
    const datePickerComponent = MainComponent.find(DatePicker);
    const datePickerInput = datePickerComponent.find('.form-control');
    datePickerInput.find('.form-control').simulate('change');
    expect(datePickerInput.hasClass('react-datepicker-ignore-onclickoutside'));
  });

  it('should pass a custom dateFormat into the DatePicker', () => {
    const datePickerComponent = MainComponent.find(DatePicker);
    expect(datePickerComponent.prop('dateFormat')).to.equal('DD MMM YYYY');
  });
});
