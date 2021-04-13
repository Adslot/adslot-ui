import React from 'react';
import { Link } from 'react-router-dom';
import { SvgSymbol } from '../../src';

const NotFound = () => (
  <div className="page-not-found">
    <SvgSymbol classSuffixes={['not-found-icon']} href="./assets/svg-symbols.svg#not-found" />
    <h3>The truth is out there somewhere.</h3>
    <h4>But currently the page you are looking for is not found</h4>
    <Link to="/">Back to Homepage</Link>
  </div>
);

export default NotFound;
