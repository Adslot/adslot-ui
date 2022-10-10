import * as svg4everybody from 'svg4everybody';

const regexp = new RegExp('(MSIE)|(Trident)', 'i');
if (regexp.test(navigator.userAgent)) {
  svg4everybody({ polyfill: true });
}
