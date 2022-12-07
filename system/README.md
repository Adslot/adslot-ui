# Adslot UI System

Built with [Style Dictionary](https://amzn.github.io/style-dictionary)

To add or update tokens, modify the `system/src/**.json` files only.

To build the changes, you can run this script from the aslot-ui root directory:

```bash
npm run dist:system
```

Each token is output as

- a postcss variable in `system/tokens/styles/tokens.css`
- a css custom property in `system/tokens/styles/vars.css`
- a json file in `system/tokens/[category].json`

Given the below input:

```json
{
  "color": {               // cateogry
    "blue": {              // type
      "base": {            // item
        "value": "#006dcc" // value
      }
  }
}
```

We can assume the following output and usage:

#### css tokens

```scss
@import url('adslot-ui/system'); // or use relative path to 'node_modules/adslot-ui/system/tokens/styles/tokens.css'

$color-blue-base: #006dcc;
```

#### js tokens

```jsx
import colorJSON from 'adslot-ui/system/tokens/color.json';
const { color } = colorJSON;

console.log(color.blue.base);
// '#006dcc'
```

### Token definition file

The token definition file at `adslot-ui/system/internal/index.js` is a complete definition file with metadata which can be used to construct documentation.
**This file should only be used for internal documetation or analysis purposes.**

#### Directory structure overview:

```
├── README.md
├── package.json
├── register.js
├── config.js
├── src/
│   ├── border/
│       ├── [...].json
│   ├── borderRadius
│       ├── [...].json
│   ├── color
│       ├── [...].json
│   ├── font
│       ├── [...].json
├── tokens/
│   ├── styles/
│      ├── tokens.css
│      ├── vars.css
│   ├── border.json
│   ├── borderRadius.json
│   ├── color.json
│   ├── font.json
|   |––internal/
|       |–– index.js
```

#### More info

Take a look at all the built-in [transforms](https://amzn.github.io/style-dictionary/#/transforms?id=pre-defined-transforms) and [formats](https://amzn.github.io/style-dictionary/#/formats?id=pre-defined-formats).
