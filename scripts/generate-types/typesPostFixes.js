const _ = require('lodash');
const chalk = require('chalk');

// some additional fixes for components that
// have unparseable prop types, or 3rd party typing requirements beyond PropTypes
// Note: `result` is pre-prettier formatting

exports.replacements = (componentName) => ({
  Accordion: {
    replacements: [
      [
        `import * as React from 'react';`,
        `import * as React from 'react';
    import Panel from '../Panel'`,
      ],
      [
        `declare const Accordion: React.FC<AccordionProps>;`,
        `declare const Accordion: React.FC<AccordionProps> & {
      Panel: typeof Panel;
    };
    `,
      ],
    ],
  },
  Anchor: {
    replacements: [
      [
        'export interface AnchorProps {',
        'export interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {',
      ],
    ],
  },
  Button: {
    replacements: [
      [
        'export interface ButtonProps {',
        'export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {',
      ],
    ],
  },
  Carousel: {
    replacements: [
      [
        `import * as React from 'react';`,
        `import * as React from 'react';
      import type { Settings } from 'react-slick';`,
      ],
      [
        'declare const Carousel: React.FC<CarouselProps>;',
        `declare const usePreventCarouselSwipeClicks: () => {
        onMouseDownCapture: (e: any) => void;
        onClickCapture: (e: any) => void;
      };

      declare const Carousel: ${withForwardRef('CarouselProps & Settings')} & {
        usePreventSwipeClicks: typeof usePreventCarouselSwipeClicks;
      };`,
      ],
    ],
  },
  DatePicker: {
    replacements: [
      [
        `import * as React from 'react';`,
        `import * as React from 'react';
       import { DatePickerProps as LibProps } from "react-datepicker";
  import { Moment } from "moment";`,
      ],
      [
        `export interface DatePickerProps {`,
        `
        export type DatePickerProps = Omit<LibProps, 'onSelect' | 'excludeScrollbar' | 'onChange' | 'selected' | 'startDate' | 'endDate' | 'minDate' | 'maxDate'> & {
        onSelect?: LibProps['onSelect'];
        excludeScrollbar?: LibProps['excludeScrollbar'];`,
      ],
      [
        `onChange: (...args: any[])=>any;`,
        `onChange: (date: Moment | Date | null, event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void`,
      ],
      [`selected?: Object;`, `selected?: Moment | Date | null;`],
      [`startDate?: Object;`, `startDate?: Moment | Date | null;`],
      [`endDate?: Object;`, `endDate?: Moment | Date | null;`],
      [`minDate?: Object;`, `minDate?: Moment | Date | null;`],
      [`maxDate?: Object;`, `maxDate?: Moment | Date | null;`],
    ],
  },
  ImageCropper: {
    replacements: [
      [
        `import * as React from 'react';`,
        `import * as React from 'react';
      import type Cropper from 'cropperjs';`,
      ],
      [`onCrop: (...args: any[])=>any;`, `onCrop: (data: Cropper.Data)=>any;`],
      [
        `declare const ImageCropper: React.FC<ImageCropperProps>;`,
        `
      declare const ImageCropper: ${withForwardRef('ImageCropperProps')};`,
      ],
    ],
  },
  Popover: {
    replacements: [
      ...popperTypingReplacements(componentName),
      [
        `import * as React from 'react';`,
        `
        import * as React from 'react';
        import WithRef from './WithRef';`,
      ],
      [
        `declare const Popover: <M>(props: PopoverProps<M>) => React.ReactElement<any, any> | null;`,
        `declare const Popover: (<M>(props: PopoverProps<M>) => React.ReactElement<any, any> | null) & {
          WithRef: typeof WithRef;
        };`,
      ],
    ],
  },
  Popper: {
    replacements: popperTypingReplacements(componentName),
  },
  Search: {
    replacements: [
      [
        `declare const Search: React.FC<SearchProps>;`,
        `
        declare const Search: ${withForwardRef('SearchProps')};`,
      ],
    ],
  },
  Select: {
    // select doesn't get picked up at all due to its compositional nature
    replacements: [
      [
        `import * as React from 'react';`,
        `
    import * as React from 'react';
    import { Props,  components, createFilter } from 'react-select';
    import CreatableSelect from 'react-select/creatable';
    import AsyncSelect from 'react-select/async';
    import AsyncCreatableSelect from 'react-select/async-creatable';

    export interface SelectProps {
      dts?: string;
      isInModal?: boolean;
    }

    declare const Select: (<OptionType extends unknown = { label: string; value: string }, IsMulti extends boolean = false>(
      props: SelectProps & Props<OptionType, IsMulti>
    ) => React.ReactElement<any, any> | null) & {
      components: typeof components;
      Creatable: typeof CreatableSelect;
      Async: typeof AsyncSelect;
      AsyncCreatable: typeof AsyncCreatableSelect;
      createFilter: typeof createFilter;
    };

    export default Select;
    `,
      ],
    ],
  },
  RichTextEditor: {
    replacements: [
      [
        `import * as React from 'react';`,
        `import * as React from 'react';
        import { EditorState, RawDraftContentState } from 'draft-js';
        import { createEditorStateWithText } from '@draft-js-plugins/editor';`,
      ],
      [
        `declare const RichTextEditor: React.FC<RichTextEditorProps>`,
        `declare const RichTextEditor: React.FC<RichTextEditorProps> & {
          createEmpty: typeof EditorState.createEmpty;
          createWithText: typeof createEditorStateWithText;
          stateToHTML: (input: EditorState) => string;
          stateFromHTML: (input: string, options?: { parser?: (html: string) => HTMLBodyElement }) => EditorState;
          stateToPlainText: (input: EditorState) => string;
          stateToEntityList: (input: EditorState) => RawDraftContentState['entityMap'];
          plainTextFromHTML: (input: string) => string;
          useTruncateState: ({
            editorState,
            briefCharCount,
            truncateString,
          }: {
            editorState: EditorState;
            briefCharCount: number;
            truncateString: string;
          }) => { totalCharCount: number; truncatedState: EditorState };
        };`,
      ],
    ],
  },
  TextEllipsis: {
    replacements: [
      [
        `import * as React from 'react';`,
        `
    import * as React from 'react';
    import { PopoverProps } from '../Popover';`,
      ],
      [`popoverProps?: any;`, `popoverProps?: PopoverProps;`],
    ],
  },

  WithRef: {
    replacements: popperTypingReplacements(componentName),
  },
});

exports.typesPostFixes = (componentName, result) => {
  function fix() {
    module.exports.replacements(componentName)[componentName].replacements?.forEach(([pattern, replacement]) => {
      if (typeof pattern === 'string' ? result.indexOf(pattern) < 0 : !result.match(pattern)?.[0]) {
        throw new Error(
          chalk.red(
            `Failed to fix types for ${chalk.bold(componentName)}.
Please check ${chalk.bold(`scripts/generate-types/typesPostFixes.js`)} and/or the component definition.
Pattern ${chalk.bold(`"${pattern}"`)} not found in definition file.`
          )
        );
      }
      result = result.replace(pattern, replacement);
    });
    return result;
  }

  if (_.keys(module.exports.replacements()).includes(componentName)) {
    return fix();
  }

  return result;
};

function popperTypingReplacements(name) {
  return [
    [
      `import * as React from 'react';`,
      `
    import * as React from 'react';
    import type { PopperModifiers } from './ReactPopper';`,
    ],
    [/^.+type \w+Modifiers.+$/m, ''],
    [/^.+modifiers\?:.+$/m, ''],
    [`export interface ${name}Props {`, `export interface ${name}Props<M = ''> extends PopperModifiers<M> {`],
    [
      `declare const ${name}: React.FC<${name}Props>;`,
      `declare const ${name}: <M>(props: ${name}Props<M>) => React.ReactElement<any, any> | null;`,
    ],
  ];
}

// adding the ref types via PropTypes works for type generation but will cause a
// `ref` is not a prop error due to ref being a 'special' prop
function withForwardRef(props) {
  return `React.ForwardRefExoticComponent<
  React.PropsWithoutRef<${props}> & React.RefAttributes<((...args: any[]) => any) | Element>
>`;
}
