import _ from 'lodash';
import React from 'react';
import { render, cleanup, fireEvent, queryByAttribute, queryAllByAttribute } from '@testing-library/react';
import TreePickerNavComponent from '.';

const getByClass = queryByAttribute.bind(null, 'class');
const queryAllByClass = queryAllByAttribute.bind(null, 'class');

const testFunction = _.noop;
const breadcrumbNodes = [{ id: 'a', label: 'UK' }, { id: 'b', label: 'London' }];

afterEach(cleanup);

const mockProps = overrides => ({
  breadcrumbNodes,
  breadcrumbOnClick: testFunction,
  onChange: testFunction,
  onClear: testFunction,
  searchValue: 'needle',
  disabled: false,
  ...overrides,
});

describe('<TreePickerNav />', () => {
  it('should render with defaults', () => {
    const { getByTestId, queryByTestId, container } = render(<TreePickerNavComponent />);

    expect(queryAllByClass(container, 'treepickernav-component')).toHaveLength(1);
    expect(getByClass(container, 'treepickernav-component')).not.toHaveClass('disabled');

    expect(getByClass(container, 'treepickernav-component')).toContainElement(getByTestId('search-wrapper'));
    expect(queryByTestId('search-wrapper')).toBeInTheDocument();

    expect(getByClass(container, 'treepickernav-component')).toContainElement(getByTestId('breadcrumb-wrapper'));
    expect(queryByTestId('breadcrumb-wrapper')).toBeInTheDocument();
  });

  it('should render with props', () => {
    const { getByTestId, queryByTestId, queryAllByTestId, container } = render(
      <TreePickerNavComponent {...mockProps()} />
    );

    expect(queryAllByClass(container, 'treepickernav-component')).toHaveLength(1);
    expect(getByClass(container, 'treepickernav-component')).not.toHaveClass('disabled');

    expect(getByClass(container, 'treepickernav-component')).toContainElement(getByTestId('search-wrapper'));
    expect(queryByTestId('search-wrapper')).toBeInTheDocument();
    expect(getByTestId('search-input')).toHaveValue('needle');

    expect(getByClass(container, 'treepickernav-component')).toContainElement(getByTestId('breadcrumb-wrapper'));
    expect(queryByTestId('breadcrumb-wrapper')).toBeInTheDocument();
    expect(queryAllByTestId('breadcrumb-node-wrapper')).toHaveLength(3);
  });

  it('should render icons with given svgSymbol and pass them to Search', () => {
    const { getByTestId } = render(
      <TreePickerNavComponent
        {...mockProps({ searchOnEnter: true })}
        svgSymbolSearch={<div className="testing-search-icon" />}
        svgSymbolCancel={<div className="testing-cancel-icon" />}
      />
    );

    expect(queryAllByClass(getByTestId('search-wrapper'), 'testing-search-icon')).toHaveLength(1);
    expect(queryAllByClass(getByTestId('search-wrapper'), 'testing-cancel-icon')).toHaveLength(1);
  });

  it('should call breadcrumbOnClick when clicked on breadcrumbs node', () => {
    const props = mockProps();
    jest.spyOn(props, 'breadcrumbOnClick');
    const { queryAllByTestId } = render(<TreePickerNavComponent {...props} />);

    fireEvent.click(queryAllByTestId('breadcrumb-node-wrapper')[0]);
    expect(props.breadcrumbOnClick).toHaveBeenCalledTimes(1);
  });

  it('should hide the search when showSearch is false', () => {
    const { queryByTestId } = render(<TreePickerNavComponent {...mockProps({ showSearch: false })} />);
    expect(queryByTestId('search-wrapper')).not.toBeInTheDocument();
  });

  describe('disabled', () => {
    let component = null;
    let breadcrumbElement = null;
    let breadcrumbNodeElement = null;
    let props = null;

    beforeEach(() => {
      props = mockProps({ disabled: true });
      jest.spyOn(props, 'breadcrumbOnClick');
      component = render(<TreePickerNavComponent {...props} />);
      breadcrumbElement = component.getByTestId('breadcrumb-wrapper');
      breadcrumbNodeElement = component.queryAllByTestId('breadcrumb-node-wrapper');
    });

    it('should have disabled class', () =>
      expect(component.getByTestId('treepicker-nav-wrapper')).toHaveClass('disabled'));
    it('should render breadcrumbs', () => expect(breadcrumbElement).toBeTruthy());

    it('should render breadcrumbs node', () => expect(breadcrumbNodeElement).toHaveLength(3));

    it('should not call breadcrumbOnClick when clicked on breadcrumbs node', () => {
      fireEvent.click(breadcrumbNodeElement[0]);

      expect(props.breadcrumbOnClick).toHaveBeenCalledTimes(0);
    });
  });
});
