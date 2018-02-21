import { shallow } from 'enzyme';
import React from 'react';
import BootstrapPagination from 'react-bootstrap/lib/Pagination';
import sinon from 'sinon';
import Pagination from '.';

describe('PaginationComponent', () => {
  let props;

  beforeEach(() => {
    props = {
      items: 3,
      activePage: 2,
      onSelect: sinon.spy(),
      next: true,
      prev: true,
    };
  });

  it('should render Bootstrap Pagination', () => {
    const element = shallow(<Pagination {...props} />);
    expect(element.find(BootstrapPagination)).to.have.length(1);
  });

  describe('Prev button', () => {
    it('should render BootstrapPagination.Prev when prev is true', () => {
      const element = shallow(<Pagination {...props} />);
      expect(element.find(BootstrapPagination.Prev)).to.have.length(1);
    });

    it('should not render BootstrapPagination.Prev when prev is false', () => {
      props.prev = false;
      const element = shallow(<Pagination {...props} />);
      expect(element.find(BootstrapPagination.Prev)).to.have.length(0);
    });

    it('should disable Prev button if activePage is the first page', () => {
      props.activePage = 1;
      const element = shallow(<Pagination {...props} />);
      expect(element.find(BootstrapPagination.Prev).prop('disabled')).to.equal(true);
    });

    it('should trigger onSelect when clicking on Prev button', () => {
      const element = shallow(<Pagination {...props} />);
      element.find(BootstrapPagination.Prev).simulate('click');
      expect(props.onSelect.calledOnce).to.equal(true);
      expect(props.onSelect.args[0][0]).to.equal(1);
    });
  });

  describe('Next button', () => {
    it('should render BootstrapPagination.Next when next is true', () => {
      const element = shallow(<Pagination {...props} />);
      expect(element.find(BootstrapPagination.Next)).to.have.length(1);
    });

    it('should not render BootstrapPagination.Next when next is false', () => {
      props.next = false;
      const element = shallow(<Pagination {...props} />);
      expect(element.find(BootstrapPagination.Next)).to.have.length(0);
    });

    it('should disable Next button if activePage is the last page', () => {
      props.activePage = 3;
      const element = shallow(<Pagination {...props} />);
      expect(element.find(BootstrapPagination.Next).prop('disabled')).to.equal(true);
    });

    it('should trigger onSelect when clicking on Next button', () => {
      const element = shallow(<Pagination {...props} />);
      element.find(BootstrapPagination.Next).simulate('click');
      expect(props.onSelect.calledOnce).to.equal(true);
      expect(props.onSelect.args[0][0]).to.equal(3);
    });
  });

  describe('Pagination button', () => {
    it('should render 3 BootstrapPagination.Item', () => {
      const element = shallow(<Pagination {...props} />);
      expect(element.find(BootstrapPagination.Item)).to.have.length(3);
    });

    it('should mark active and disable clicking for the current page button', () => {
      const element = shallow(<Pagination {...props} />);
      const pageButtons = element.find(BootstrapPagination.Item);
      expect(pageButtons.at(1).prop('disabled')).to.equal(true);
      expect(pageButtons.at(1).prop('active')).to.equal(true);
    });

    it('should trigger onSelect when clicking on Pagination button', () => {
      const element = shallow(<Pagination {...props} />);
      const pageButtons = element.find(BootstrapPagination.Item);
      pageButtons.at(0).simulate('click');
      expect(props.onSelect.calledOnce).to.equal(true);
      expect(props.onSelect.args[0][0]).to.equal(1);
    });
  });
});
