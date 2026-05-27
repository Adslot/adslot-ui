import _ from 'lodash';

// http: is intentionally allowed — users link to non-HTTPS intranet/legacy hosts.
const ALLOWED_PROTOCOLS = ['http:', 'https:', 'mailto:'];

/**
 * Returns a safe href, or '' if the input cannot be made safe. Bare domains
 * are upgraded to https; javascript:/data: and other schemes are rejected so
 * they can never be written into an anchor's href.
 */
const sanitizeUrl = (input) => {
  const trimmed = _.trim(input);
  if (_.isEqual(trimmed, '')) {
    return '';
  }
  const candidate = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const { protocol } = new URL(candidate);
    return _.includes(ALLOWED_PROTOCOLS, protocol) ? candidate : '';
  } catch {
    return '';
  }
};

export default sanitizeUrl;
