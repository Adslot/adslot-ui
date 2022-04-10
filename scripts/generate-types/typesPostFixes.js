// some additional fixes for components that
// have unparseable prop types, or 3rd party typing requirements beyond PropTypes
// Note: `result` is pre-prettier formatting

module.exports = function typesPostFixes(componentName, result) {
  switch (componentName) {
    case 'ImageCropper':
      return `import type Cropper from 'cropperjs';
      ${result.replace(`onCrop: (...args: any[])=>any;`, `onCrop: (data: Cropper.Data)=>any;`).replace(
        `declare const ImageCropper: React.FC<ImageCropperProps>;`,
        `
        declare const ImageCropper: ${withForwardRef('ImageCropperProps')};`
      )}`;

    case 'Search':
      return result.replace(
        `declare const Search: React.FC<SearchProps>;`,
        `
          declare const Search: ${withForwardRef('SearchProps')};`
      );

    case 'Button':
      return result.replace(
        'export interface ButtonProps {',
        'export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {'
      );

    case 'Anchor':
      return result.replace(
        'export interface AnchorProps {',
        'export interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {'
      );

    case 'TextEllipsis':
      return result
        .replace(
          `import * as React from 'react';`,
          `
      import * as React from 'react';
      import { PopoverProps } from '../Popover';`
        )
        .replace(`popoverProps?: any;`, `popoverProps?: PopoverProps;`);

    case 'Popover':
      return popperTyping(result, 'Popover')
        .replace(
          `import * as React from 'react';`,
          `
          import * as React from 'react';
          import WithRef from './WithRef';`
        )
        .replace(
          `declare const Popover: <M>(props: PopoverProps<M>) => React.ReactElement<any, any> | null;`,
          `declare const Popover: (<M>(props: PopoverProps<M>) => React.ReactElement<any, any> | null) & {
            WithRef: typeof WithRef;
          };`
        );

    case 'WithRef':
      return popperTyping(result, 'WithRef');

    case 'Popper':
      return popperTyping(result, 'Popper');

    case 'Accordion':
      return result
        .replace(
          `import * as React from 'react';`,
          `import * as React from 'react';
      import Panel from '../Panel'`
        )
        .replace(
          `declare const Accordion: React.FC<AccordionProps>;`,
          `declare const Accordion: React.FC<AccordionProps> & {
        Panel: typeof Panel;
      };
      `
        );

    case 'Carousel':
      return `import type { Settings } from 'react-slick';
      ${result.replace(
        'declare const Carousel: React.FC<CarouselProps>;',
        `declare const usePreventCarouselSwipeClicks: () => {
          onMouseDownCapture: (e: any) => void;
          onClickCapture: (e: any) => void;
        };

        declare const Carousel: ${withForwardRef('CarouselProps & Settings')} & {
          usePreventSwipeClicks: typeof usePreventCarouselSwipeClicks;
        };`
      )}`;

    case 'RichTextEditor':
      return `import { EditorState, ContentState, RawDraftContentState } from 'draft-js';
      import { createEditorStateWithText } from '@draft-js-plugins/editor';
      ${result.replace(
        `declare const RichTextEditor: React.FC<RichTextEditorProps>`,
        `declare const RichTextEditor: React.FC<RichTextEditorProps> & {
          createEmpty: typeof EditorState.createEmpty;
          createWithText: typeof createEditorStateWithText;
          stateToHTML: (input: ContentState) => string;
          stateFromHTML: (input: string) => EditorState;
          stateToPlainText: (input: ContentState) => string;
          stateToEntityList: (input: ContentState) => RawDraftContentState['entityMap'];
        };`
      )}
      `;

    // select doesn't get picked up at all due to its compositional nature
    case 'Select':
      return `
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
      `;

    case 'DatePicker':
      return `
    import { ReactDatePickerProps } from "react-datepicker";
    import { Moment } from "moment";

    ${result
      .replace(
        `export interface DatePickerProps {`,
        `
        export interface DatePickerProps {
        selected?: Moment | Date | null;
        onChange?(date: Moment | Date | null): void;
        startDate?: Moment | Date | null;
        endDate?: Moment | Date | null;
        minDate?: Moment | Date | null;
        maxDate?: Moment | Date | null;`
      )
      .replace(
        `declare const DatePicker: React.FC<DatePickerProps>;`,
        `declare const DatePicker: ${withForwardRef(
          'DatePickerProps & Omit<ReactDatePickerProps, keyof DatePickerProps>'
        )};`
      )}`;
    default:
      return result;
  }
};

// adding the ref types via PropTypes works for type generation but will cause a
// `ref` is not a prop error due to ref being a 'special' prop
function withForwardRef(props) {
  return `React.ForwardRefExoticComponent<
  React.PropsWithoutRef<${props}> & React.RefAttributes<((...args: any[]) => any) | Element>
>`;
}

// replace modifiers with correct types
function popperTyping(result, name) {
  return result
    .replace(
      `import * as React from 'react';`,
      `
    import * as React from 'react';
    import type { PopperModifiers } from './ReactPopper';`
    )
    .replace(/^.+type \w+Modifiers.+$/m, '')
    .replace(/^.+modifiers\?:.+$/m, '')
    .replace(`export interface ${name}Props {`, `export interface ${name}Props<M = ''> extends PopperModifiers<M> {`)
    .replace(
      `declare const ${name}: React.FC<${name}Props>;`,
      `declare const ${name}: <M>(props: ${name}Props<M>) => React.ReactElement<any, any> | null;`
    );
}
