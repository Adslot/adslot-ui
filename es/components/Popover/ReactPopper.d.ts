import type * as ReactPopper from 'react-popper';

export interface PopperModifiers<Modifiers> {
  modifiers?: ReadonlyArray<
    ReactPopper.Modifier<
      Modifiers extends ''
        ?
            | 'popperOffsets'
            | 'offset'
            | 'preventOverflow'
            | 'arrow'
            | 'flip'
            | 'hide'
            | 'computeStyles'
            | 'applyStyles'
            | 'eventListeners'
        : Modifiers
    >
  >;
}
