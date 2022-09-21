import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import ActionPanel from '../ActionPanel';
import Button from '../Button';
import ListPickerPure from '../ListPickerPure';
import SplitPane from '../SplitPane';
import FlexibleSpacer from '../FlexibleSpacer';
import Grid from '../Grid';
import GridRow from '../Grid/Row';
import GridCell from '../Grid/Cell';
import './styles.css';
import Anchor from '../Anchor';

const isSubset = (array, subArray) => _(subArray).difference(array).isEmpty();

const ListPicker = ({
  allowMultiSelection,
  allowEmptySelection,
  emptyMessage,
  emptySvgSymbol,
  labelFormatter,
  addonFormatter,
  itemHeaders,
  items,
  itemType,
  itemInfo,
  initialSelection,
  show,
  modalClassName,
  modalTitle,
  modalDescription,
  modalFootnote,
  linkButtons,
  modalApply,
  modalClose,
}) => {
  const getApplyButtonState = (selectedItems) => {
    if (allowEmptySelection) return false;

    return _.isEmpty(selectedItems);
  };

  const [selectedItems, setSelectedItems] = React.useState(initialSelection);
  const [disableApplyButton, setDisableApplyButton] = React.useState(getApplyButtonState(initialSelection));

  const selectItem = (item) => {
    const newSelectedItems = allowMultiSelection ? [...selectedItems, item] : [item];
    setSelectedItems(newSelectedItems);
    setDisableApplyButton(getApplyButtonState(newSelectedItems));
  };

  const deselectItem = (item) => {
    const updatedItems = _.reject(selectedItems, { id: item.id });
    setSelectedItems(updatedItems);

    setDisableApplyButton(getApplyButtonState(selectedItems));
  };

  const cancelAction = () => {
    modalClose();
    setSelectedItems(_.clone(initialSelection));
    setDisableApplyButton(getApplyButtonState(initialSelection));
  };

  const applyAction = () => {
    modalApply(selectedItems);
  };

  const listPickerPureElement = (
    <ListPickerPure
      allowMultiSelection={allowMultiSelection}
      emptyMessage={emptyMessage}
      emptySvgSymbol={emptySvgSymbol}
      deselectItem={deselectItem}
      labelFormatter={labelFormatter}
      addonFormatter={addonFormatter}
      itemHeaders={itemHeaders}
      items={items}
      itemType={itemType}
      selectItem={selectItem}
      selectedItems={selectedItems}
    />
  );

  return (
    show && (
      <ActionPanel
        isModal
        className={modalClassName}
        title={modalTitle}
        onClose={cancelAction}
        actionButton={
          <>
            {_.isEmpty(linkButtons) ? null : (
              <div className="pull-left">
                {_.map(linkButtons, (linkButton, key) =>
                  _.isObject(linkButton) && isSubset(_.keys(linkButton), ['label', 'href']) ? (
                    <Anchor key={linkButton.label} variant="inverse" href={linkButton.href}>
                      {linkButton.label}
                    </Anchor>
                  ) : (
                    React.cloneElement(linkButton, { key })
                  )
                )}
              </div>
            )}
            <Button
              color="primary"
              onClick={applyAction}
              disabled={disableApplyButton}
              data-test-selector="listpicker-apply-button"
            >
              Apply
            </Button>
          </>
        }
      >
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
                {_.map(itemInfo.properties, (property) => (
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
      </ActionPanel>
    )
  );
};

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

ListPicker.propTypes = {
  allowEmptySelection: PropTypes.bool,
  allowMultiSelection: PropTypes.bool,
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

ListPicker.defaultProps = {
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

export default ListPicker;
