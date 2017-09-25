import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-icheck/lib/Checkbox';
import Radio from 'react-icheck/lib/Radio';
import RadioGroup from 'react-icheck/lib/RadioGroup';
import Select from 'react-select';
import {
  FilePicker,
  FormGroup,
  HelpIconPopover,
} from 'adslot-ui';
import {
  BorderedWell,
  PageTitle,
} from 'alexandria';
import mapDispatchToProps from '../redux/actions';

const selectFruit = [
  { value: 'du', label: 'Durian' },
  { value: 'ku', label: 'Kumquat' },
  { value: 'ra', label: 'Rambutan' },
];

const ExampleForm = ({
  formValues,
  isSubmitting,
  updateValues,
  validateAndSave,
}) => {
  const onChange = (attribute) => ({ target: { value } }) => updateValues({ [attribute]: value });
  const onChangeCheckbox = (attribute) => ({ target: { checked } }) => updateValues({ [attribute]: checked });
  const onChangeSelect = (attribute) => ({ value }) => updateValues({ [attribute]: value });
  const onChangeFile = (fileData) => updateValues({ file: fileData });

  const submitForm = () => validateAndSave(formValues);
  const footerText = (
    <div>
      <strong>NOTE:</strong> This could have something useful to say.
      <HelpIconPopover placement="top" id="form-example-help">
        <p><strong>Further information.</strong></p>
        <p>If you're not sure what<br />to do you may find<br />this information<br />more insightful.</p>
      </HelpIconPopover>
    </div>
  );

  return (
    <BorderedWell>
      <PageTitle title="Form Example">
        <Button className="btn-inverse" disabled={isSubmitting}>Cancel</Button>
        <Button bsStyle="primary" onClick={submitForm} disabled={isSubmitting}>Save</Button>
      </PageTitle>

      <form className="form-horizontal">
        <fieldset>

          <FormGroup
            addon="$"
            disabled={isSubmitting}
            helpText="Helpful text."
            label="Form Group"
            onChange={onChange('group')}
            placeholder="5.00"
            value={formValues.group}
          />

          <div className="form-group">
            <label htmlFor="exampleTextInput" className="control-label col-xs-3">Text input</label>
            <div className="col-xs-5">
              <div className="input-group col-xs-12">
                <input
                  className="form-control"
                  disabled={isSubmitting}
                  id="exampleTextInput"
                  onChange={onChange('text')}
                  placeholder="Text input"
                  type="text"
                  value={formValues.text}
                />
              </div>
              <br />

              <div className="form-control-static">Instruction or grouped placeholder</div>
              <div className="input-group col-xs-12">
                <div className="input-group-addon">$</div>
                <input
                  className="form-control"
                  disabled={isSubmitting}
                  id="exampleTextInputAddon"
                  onChange={onChange('addonText')}
                  placeholder="w. addon"
                  type="text"
                  value={formValues.addonText}
                />
                <div className="input-group-addon">value</div>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="borderless">
          <div className="form-group">
            <label htmlFor="exampleTextarea" className="control-label col-xs-3">
              Text area
              <div className="help-block">(recommended)</div>
            </label>
            <div className="col-xs-5">
              <textarea
                className="form-control"
                disabled={isSubmitting}
                id="exampleTextarea"
                onChange={onChange('textarea')}
                placeholder="Text area"
                value={formValues.textarea}
              />
              <p className="help-block">Help text or example.</p>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="fruitSelect" className="control-label col-xs-3">Select box</label>
            <div className="col-xs-5">
              <Select
                clearable={false}
                disabled={isSubmitting}
                id="fruitSelect"
                name="fruitSelect"
                noResultsText="No matching fruit."
                onChange={onChangeSelect('select')}
                options={selectFruit}
                placeholder="Fruit"
                value={formValues.select}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputFile" className="control-label col-xs-3">File input</label>
            <div className="col-xs-5">
              <input
                type="file"
                disabled={isSubmitting}
                id="exampleInputFile"
                onChange={onChange('file')}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="exampleFilePicker" className="control-label col-xs-3">FilePicker Component</label>
            <div className="col-xs-5">
              <FilePicker
                filter="*.*"
                disabled={isSubmitting}
                placeholder="No file selected"
                label="Add file"
                onSelect={onChangeFile}
                dts="file-picker-example"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-xs-5 col-xs-offset-3">
              <div className="checkbox">
                <Checkbox
                  disabled={isSubmitting}
                  label={<span>Accept the terms.</span>}
                  onChange={onChangeCheckbox('checkbox')}
                  value={formValues.checkbox}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="exampleCheckbox" className="control-label col-xs-3">Enable Some Feature</label>
            <div className="col-xs-5">
              <div className="checkbox">
                <Checkbox
                  disabled={isSubmitting}
                  onChange={onChangeCheckbox('checkbox')}
                  value={formValues.checkbox}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="exampleRadioGroup" className="control-label col-xs-3">RadioGroup Stacked</label>
            <div className="col-xs-5">
              <RadioGroup className="radiogroup-stacked" name="testRadioGroup">
                <Radio
                  label="Geography"
                  value="geography"
                />
                <Radio
                  label="Contextual"
                  value="contextual"
                />
                <Radio
                  label="Audience"
                  value="audience"
                />
              </RadioGroup>
            </div>
          </div>

        </fieldset>
      </form>

      <PageTitle isFooter title={footerText}>
        <Button className="btn-inverse" disabled={isSubmitting}>Cancel</Button>
        <Button bsStyle="primary" onClick={submitForm} disabled={isSubmitting}>Save</Button>
      </PageTitle>
    </BorderedWell>
  );
};

ExampleForm.propTypes = {
  formValues: PropTypes.shape({
    addonText: PropTypes.string,
    checkbox: PropTypes.bool,
    file: PropTypes.object,
    group: PropTypes.string,
    select: PropTypes.string,
    text: PropTypes.string,
    textarea: PropTypes.string,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  updateValues: PropTypes.func.isRequired,
  validateAndSave: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  formValues: state.form,
  isSubmitting: state.visibility.isSubmitting,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExampleForm);
exports.ExampleFormPure = ExampleForm; // unconnected for unit tests
