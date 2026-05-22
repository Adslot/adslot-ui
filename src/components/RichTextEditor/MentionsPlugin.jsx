import _ from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  useBasicTypeaheadTriggerMatch,
} from '@lexical/react/LexicalTypeaheadMenuPlugin';
import { $createTextNode } from 'lexical';
import { $createMentionNode } from './MentionNode';
import MentionEntry from './MentionEntry';

const MAX_SUGGESTIONS = 10;

class MentionTypeaheadOption extends MenuOption {
  constructor(mention) {
    super(mention.name);
    this.mention = mention;
  }
}

/**
 * Wires an @-mention typeahead onto the editor. Typing `@` opens a menu filtered
 * against the `mentions` list; selecting an option inserts an atomic MentionNode.
 */
const MentionsPlugin = ({ mentions }) => {
  const [editor] = useLexicalComposerContext();
  const [query, setQuery] = useState(null);

  const options = useMemo(() => {
    const search = _.toLower(query);
    // Lazy lodash chain: filtering and mapping stop once MAX_SUGGESTIONS
    // matches are produced rather than scanning the whole mentions list.
    return _(mentions)
      .filter((mention) => _.includes(_.toLower(mention.name), search))
      .take(MAX_SUGGESTIONS)
      .map((mention) => new MentionTypeaheadOption(mention))
      .value();
  }, [mentions, query]);

  const triggerFn = useBasicTypeaheadTriggerMatch('@', { minLength: 0, allowWhitespace: true });

  const onSelectOption = useCallback(
    (selectedOption, nodeToReplace, closeMenu) => {
      editor.update(() => {
        // For an `@`-triggered typeahead the menu always supplies the text node
        // holding the query, so it can be replaced directly with the mention.
        const mentionNode = $createMentionNode(`@${selectedOption.mention.name}`);
        nodeToReplace.replace(mentionNode);
        const trailingSpace = $createTextNode(' ');
        mentionNode.insertAfter(trailingSpace);
        trailingSpace.select();
        closeMenu();
      });
    },
    [editor]
  );

  const renderMenu = (anchorElementRef, { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }) => {
    if (!anchorElementRef.current || !options.length) {
      return null;
    }
    // The editor wrapper sets `overflow: hidden` to clip the toolbar to its rounded
    // corners, which would also clip a menu rendered inside the editor DOM. Portal
    // to the body instead and mirror the Lexical anchor's viewport position — the
    // anchor still tracks the caret as the user types, so reading its rect on each
    // render keeps the menu pinned correctly.
    const rect = anchorElementRef.current.getBoundingClientRect();
    return createPortal(
      <div className="aui--mention" role="listbox" style={{ top: rect.bottom, left: rect.left }}>
        {options.map((option, index) => (
          <MentionEntry
            key={option.key}
            mention={option.mention}
            isFocused={_.isEqual(selectedIndex, index)}
            setRefElement={(element) => option.setRefElement(element)}
            onMouseEnter={() => setHighlightedIndex(index)}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              setHighlightedIndex(index);
              selectOptionAndCleanUp(option);
            }}
          />
        ))}
      </div>,
      document.body
    );
  };

  return (
    <LexicalTypeaheadMenuPlugin
      options={options}
      triggerFn={triggerFn}
      onQueryChange={setQuery}
      onSelectOption={onSelectOption}
      menuRenderFn={renderMenu}
    />
  );
};

MentionsPlugin.propTypes = {
  mentions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string,
      avatar: PropTypes.string,
    })
  ).isRequired,
};

export default MentionsPlugin;
