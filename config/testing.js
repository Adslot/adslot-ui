import { render, screen, queryHelpers, within, queries, buildQueries } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const queryAllByClass = (container, value) => {
  const matcher = (nodeClasses) => {
    const classList = nodeClasses.split(' ');
    return value.split(' ').every((entry) => classList.find((part) => part === entry));
  };

  return queryHelpers.queryAllByAttribute('class', container, matcher, { exact: false });
};
const getClassMultipleError = (_c, value) => `Found multiple elements with the className of: ${value}`;
const getClassMissingError = (_c, value) => `Unable to find an element with the className of: ${value}`;
const [queryByClass, getAllByClass, getByClass, findAllByClass, findByClass] = buildQueries(
  queryAllByClass,
  getClassMultipleError,
  getClassMissingError
);

const queryAllByDts = (...args) => queryHelpers.queryAllByAttribute('data-test-selector', ...args);
const getDtsMultipleError = (_c, value) => `Found multiple elements with the data-test-selector of: ${value}`;
const getDtsMissingError = (_c, value) => `Unable to find an element with the data-test-selector of: ${value}`;
const [queryByDts, getAllByDts, getByDts, findAllByDts, findByDts] = buildQueries(
  queryAllByDts,
  getDtsMultipleError,
  getDtsMissingError
);

const byClass = { queryAllByClass, queryByClass, getAllByClass, getByClass, findAllByClass, findByClass };
const byDts = { queryAllByDts, queryByDts, getAllByDts, getByDts, findAllByDts, findByDts };
const customWithin = (ui) => within(ui, { ...queries, ...byClass, ...byDts });

const classQueries = within(document.body, byClass);
const dtsQueries = within(document.body, byDts);
const customScreen = { ...screen, ...classQueries, ...dtsQueries };

let user = userEvent.setup();
beforeEach(() => {
  user = userEvent.setup();
});
const customRender = (ui, options) => {
  user = userEvent.setup();
  return render(ui, options);
};

export * from '@testing-library/react';
export { user };
export { customWithin as within };
export { customScreen as screen };
export { customRender as render };
