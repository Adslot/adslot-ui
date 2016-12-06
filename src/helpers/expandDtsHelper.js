// A DTS is an attribute which attaches a selector to a component so E2Es can locate and navigate through the DOM.
// expandDts converts a string to an object for ES6 expansion as <img {...expandDts(dtsString)} />
const expandDts = (dtsString) => (dtsString ? { 'data-test-selector': dtsString } : {});

export default expandDts;
