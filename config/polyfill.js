const regexp = new RegExp('(MSIE)|(Trident)', 'i');
if (regexp.test(navigator.userAgent)) {
  require('svg4everybody')({ polyfill: true });
}
