import { createLinkMatcherWithRegExp } from '@lexical/react/LexicalAutoLinkPlugin';

const URL_REGEX =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;

const EMAIL_REGEX = /([A-Za-z0-9._%+-]{1,64}@[A-Za-z0-9.-]{1,255}\.[A-Za-z]{2,24})/;

/**
 * Matchers for AutoLinkPlugin: bare web URLs become http(s) links, bare email
 * addresses become mailto links.
 */
const MATCHERS = [
  createLinkMatcherWithRegExp(URL_REGEX, (text) => (text.startsWith('http') ? text : `https://${text}`)),
  createLinkMatcherWithRegExp(EMAIL_REGEX, (text) => `mailto:${text}`),
];

export default MATCHERS;
