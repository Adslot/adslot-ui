declare const colorType: Root['color']
export default colorType

interface Root {
  color: Color;
}
interface Color {
  border: Border;
  gray: Gray;
  shadow: Shadow;
  text: Text;
}
interface Text {
  base: string;
  light: string;
  label: string;
  form: string;
  sub: string;
  disabled: string;
  placeholder: string;
}
interface Shadow {
  light: string;
  base: string;
}
interface Gray {
  white: string;
  lightest: string;
  lighter: string;
  light: string;
  base: string;
  dark: string;
  darker: string;
  darkest: string;
}
interface Border {
  lightest: string;
  lighter: string;
  light: string;
  base: string;
  dark: string;
}