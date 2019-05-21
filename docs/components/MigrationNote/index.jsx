import React from 'react';
import Collapse from 'react-bootstrap/lib/Collapse';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import coy from 'react-syntax-highlighter/styles/prism/coy';

import { Button } from '../../../src';

registerLanguage('jsx', jsx);

class MigrationNote extends React.Component {
  state = {
    showModal: false,
  };

  openCollapse = () => {
    this.setState(prev => ({ showModal: !prev.showModal }));
  };

  render() {
    return (
      <>
        <Button bsStyle="link" onClick={this.openCollapse} className="migration-docs">
          <b>Version 27 Migration guide </b>
          <span role="img" aria-label="emoji">
            📚
          </span>
        </Button>
        <Collapse in={this.state.showModal} mountOnEnter>
          <div>
            <h2>Migration Guide</h2>
            <hr />
            <h3>Search Component</h3>
            <p>
              The new {`<Search />`} component will replace the old {`<Search />`} amd {`<SearchBar />`} component.
            </p>
            <p>
              1. <b>onSearch</b> function is the only required prop. It can work as an uncontrolled component without{' '}
              <b>value</b> and <b>onChange</b>.
            </p>
            <p>
              2. New Search bar will by default trigger <b>onSearch</b> when input changes. You can set{' '}
              <b>searchOnEnter</b> to true and <b>onSearch</b> will be triggered only when user press Enter or click the
              search button.
            </p>
            <p>
              3. <b>icons</b> needs to be provided as an object of nodes:
            </p>
            <SyntaxHighlighter language="jsx" style={coy}>
              {`
                {
                  search: React.Node,
                  close: React.Node,
                  loader: React.Node
                }
              `}
            </SyntaxHighlighter>
            <p>New Search component will use its default icons if none or some of the icons are not provided.</p>
            <p>
              For more information check the example: <a href="#search-example">Search Example</a>
            </p>
            <br />
            <h3>TreePicker Component</h3>
            <p>
              <b>searchOnChange</b> prop is removed and <b>searchOnEnterKey</b> prop is renamed <b>searchOnEnter</b>.
              Tree picker is search on input by default.
            </p>
            <p>
              For more information check the example: <a href="#tree-picker-example">TreePicker Example</a>
            </p>
            <br />
            <h3>Popover Component</h3>
            <p>
              The {`<Popover />`} component can be themed by providing one of the following values to the <b>theme</b>{' '}
              prop:{` `}
              <b>[&apos;light&apos;, &apos;dark&apos;, &apos;warn&apos;, &apos;error&apos;]</b>.
            </p>
            <p>
              For more information check the example: <a href="#popover-example">Popover Example</a>
            </p>
            <br />
            <h3>Accordion Component</h3>
            <p>The accordion component has been rewritten due to performance concerns.</p>
            <p>
              The new component no longer accepts the <b>&apos;panels&apos;</b> prop.
            </p>
            <b>Old way:</b>
            <SyntaxHighlighter language="jsx" style={coy}>
              {`
              <Accordion
                panels={[
                  {
                    id: '1',
                    icon: { href: './assets/svg-symbols.svg#list' },
                    title: 'Filter by region',
                    isCollapsed: true,
                    content: (
                      <ul className="list-unstyled">
                        <li>
                          <Checkbox label="Australia" />
                        </li>
                        <li>
                          <Checkbox label="New Zealand" />
                        </li>
                      </ul>
                    ),
                  },
                ]}
                onPanelClick={this.toggleAccordionPanel}
              />
            `}
            </SyntaxHighlighter>
            <b>New way: Each panel should be provided as a child of the Accordion component.</b>
            <SyntaxHighlighter language="jsx" style={coy}>
              {`
              <Accordion onPanelClick={this.toggleAccordionPanel}>
                <Panel
                  id='1'
                  icon={{ href: './assets/svg-symbols.svg#list' }}
                  title='Filter by region'
                >
                <ul className="list-unstyled">
                  <li>
                    <Checkbox label="Australia" />
                  </li>
                  <li>
                    <Checkbox label="New Zealand" />
                  </li>
                </ul>
                </Panel>
              </Accordion>
            `}
            </SyntaxHighlighter>
            <h3>Tabs Component</h3>
            <p>This component has been rewritten due to some React issues.</p>
            <p>Also Adslot-ui lib has deprecated Tabs and Tab from react-bootstrap</p>
            <p>
              For more information check the example: <a href="#tab-example">Tab Example</a>
            </p>
            <br />
            <h3>Checkbox Component</h3>
            <p>
              This component will support 3 states <i>CHECKED, PARTIAL CHECKED AND NON-CHECKED</i> from version 27{' '}
            </p>
            <p>Also the onChange function has changed</p>
            <SyntaxHighlighter language="jsx" style={coy}>
              {`
              From: onChange = (event, name) => {...}
              To: onChange = (nextCheckState, name, value) => {...}
              `}
            </SyntaxHighlighter>
            <p>The nextCheckState will be:</p>
            <SyntaxHighlighter language="jsx" style={coy}>
              {`
              true => false  false => true  'partial' => false
              `}
            </SyntaxHighlighter>
            <p>
              For more information check the example: <a href="#checkbox-example">Checkbox Example</a>
            </p>
          </div>
        </Collapse>
      </>
    );
  }
}

export default MigrationNote;
