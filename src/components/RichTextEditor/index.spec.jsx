import { mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import { RichUtils } from 'draft-js';
import RichTextEditor from '../RichTextEditor';

describe('<RichTextEditor />', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should render rich text editor', () => {
    const wrapper = mount(<RichTextEditor />);
    expect(wrapper.find(RichTextEditor).length).to.equal(1);
  });

  it('should hide placeholder on focus editor on click', () => {
    const wrapper = mount(<RichTextEditor />);
    expect(wrapper.find('.public-DraftEditorPlaceholder-root').length).to.equal(1);
    wrapper.find('.aui--editor-root').prop('onClick')();
    wrapper.update();
    expect(
      wrapper.find('.public-DraftEditorPlaceholder-root').hasClass('public-DraftEditorPlaceholder-hasFocus')
    ).to.equal(true);
  });

  it('should warn when value is passed and onChange is not', () => {
    const warnSpy = sandbox.spy(console, 'warn');
    mount(<RichTextEditor value={RichTextEditor.createEmpty()} />);
    expect(warnSpy.called).to.equal(true);
  });

  it('should set initial state correctly', () => {
    const wrapper = mount(<RichTextEditor initialValue={RichTextEditor.stateFromHTML('<b>test</b>')} />);
    expect(wrapper.find(RichTextEditor).text()).to.equal('test');
  });

  it('should fire onChange correctly', () => {
    const wrapper = mount(<RichTextEditor />);
    wrapper.find('DraftEditor').prop('onChange')(RichTextEditor.stateFromHTML('<b>123</b>'));
    wrapper.update();
    expect(wrapper.find(RichTextEditor).text()).to.equal('123');
  });

  it('should pass state if onChange is supplied', () => {
    const stub = sandbox.stub();
    const wrapper = mount(<RichTextEditor value={RichTextEditor.createEmpty()} onChange={stub} />);
    const newState = RichTextEditor.stateFromHTML('<strong>123</strong>');
    wrapper.find('DraftEditor').prop('onChange')(newState);
    wrapper.update();
    expect(RichTextEditor.stateToHTML(stub.args[0][0])).to.equal('<p><strong>123</strong></p>');
  });

  it('should correctly handle key commands', () => {
    const stub = sandbox.spy(RichUtils, 'handleKeyCommand');
    const onChangeStub = sandbox.stub();
    const newState = RichTextEditor.stateFromHTML('123');
    const wrapper = mount(<RichTextEditor initialValue={newState} onChange={onChangeStub} />);
    wrapper.find('DraftEditor').prop('handleKeyCommand')('foo');
    wrapper.update();
    expect(onChangeStub.called).to.equal(false);

    wrapper.find('DraftEditor').prop('handleKeyCommand')('bold');
    wrapper.update();
    expect(stub.args[1][0]).to.equal(newState);
    expect(stub.args[1][1]).to.equal('bold');
  });

  it('should toggle italics', () => {
    const stub = sandbox.spy(RichUtils, 'toggleInlineStyle');
    const newState = RichTextEditor.stateFromHTML('123');
    const wrapper = mount(<RichTextEditor initialValue={newState} onChange={stub} />);
    wrapper.find('ToolbarButton[style="ITALIC"]').prop('onToggle')();
    wrapper.update();
    expect(RichTextEditor.stateToHTML(stub.args[0][0])).to.equal('<p>123</p>');
    expect(stub.args[0][1]).to.equal('ITALIC');
  });

  it('should correctly generate unordered list', () => {
    const stub = sandbox.spy(RichUtils, 'toggleBlockType');
    const newState = RichTextEditor.stateFromHTML('123');
    const wrapper = mount(<RichTextEditor initialValue={newState} onChange={stub} />);
    wrapper.find('ToolbarButton[style="ordered-list-item"]').prop('onToggle')();
    wrapper.update();
    expect(RichTextEditor.stateToHTML(stub.args[0][0])).to.equal('<p>123</p>');
    expect(stub.args[0][1]).to.equal('ordered-list-item');
  });
});
