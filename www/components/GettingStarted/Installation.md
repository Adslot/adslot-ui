## Installation

Adslot UI is available as an <a href="https://www.npmjs.com/package/adslot-ui" target="_blank">npm package</a>.

### npm
To install and save in your `package.json` dependencies, run:
```bash
npm install adslot-ui
```

### Peer dependencies
- [moment.js](https://github.com/moment/moment) >= 1.0
- [react](https://github.com/facebook/react) >= 16.0
- [react-dom](https://github.com/facebook/react/tree/master/packages/react-dom) >= 16.0
- [lodash](https://github.com/lodash/lodash) >= 4.0


### Quick Start

You can use any of the components as demonstrated in this documentation. Please refer to each component item to see how they are used.

This is an example on how to use a component in your application
```jsx
import React from 'react';
import { AlertInput } from 'adslot-ui';

// this css file contains all necessary styles for adslot-ui to display correctly
// you just need to import this file once in your root component
import 'adslot-ui/dist/adslot-ui-main.css';

function MyComponent() {
  return <AlertInput />;
}

function App() {
  return (
    <MyComponent />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```
