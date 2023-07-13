import { hex, score } from 'wcag-contrast';
import c from '../../system/tokens/color.json';
const { color } = c;

const useAccessibleContrastRatio = (value) => {
  const ratio = (colorOne, colorTwo) => hex(colorOne, colorTwo).toFixed(2);

  const ratioOnWhite = ratio(value, color.white);
  const ratioOnText = ratio(value, color.text.base);
  const passesOnWhite = ratioOnWhite > 4.5;
  const passesOnText = ratioOnText > 4.5;
  const scoreOnWhite = score(ratioOnWhite);
  const scoreOnText = score(ratioOnText);

  return {
    passesOnText,
    scoreOnText,
    ratioOnText,
    passesOnWhite,
    scoreOnWhite,
    ratioOnWhite,
  };
};

export default useAccessibleContrastRatio;
