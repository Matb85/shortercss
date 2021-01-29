# ShorterCSS - An Open Source Solution for shortening/obfuscating CSS selectors

# This project continues the idea of [gulp-selectors](https://github.com/cazzer/gulp-selectors/)

> Minify those pesky selector names down to nothing with this fancy gulp plugin. Minified selectors will be applied consistently across all files piped into it.

| Input                                               | Output                                 |
| --------------------------------------------------- | -------------------------------------- |
| `.class-name { ... }`                               | `.a { ... }`                           |
| `.another-class { ... }`                            | `.b { ... }`                           |
| `#an-id { ... }`                                    | `#a { ... }`                           |
| `<div class="class-name"> ... </div>`               | `<div class="a"> ... </div>`           |
| `document.getElementById("an-id")`                  | `document.getElementById("a")`         |
| `document.querySelectorAll("#an-id > .class-name")` | `document.querySelectorAll("#a > .a")` |

_You're like: `.some-super-descriptive-selector-name {...}`, and it's like: `.a {...}`_

## Setup

1. First and foremost: `npm i -D shortercss`

2. Create a shortercss.config.js file and put some options:
   see (the available options)[#config]

```js
// shortercss.config.js

module.exports = {
  /*config*/
};
```

1. create a ShorterCSS instace and run it on a string:

```js
const ShorterCSS = require("css-terser");

const Instance = new ShorterCSS();

const code = `<h1 class="some__class"></h1>`;

const reducedCode = Instance.processors[yourProcessor](code, Instance.classLibrary, Instance.idLibrary);

console.log(reducedCode);
```

by default Css Terser will look at the root of your project for the config file. If you don't like this you can either:

- specify path to the shortercss.config.js if it's in a different directory

```js
const Instance = new ShorterCSS("path/to/shortercss.config.js");
```

- put your config as a function's argument:

```ts
const Instance = new ShorterCSS({
  /*config*/
});
```

### Config

Css Terser is fully configurable. Here's the scheme:

```js
// shortercss.config.js

// first import the processors - html, css and js-strings are built-in
const html = require("css-terser/dist/processors/html.js").default;
const css = require("css-terser/dist/processors/css.js").default;
const jsStrings = require("css-terser/dist/processors/js-strings.js").default;
// Of course you can use your own ones
const yourProcessor = require("path/to/your/processor");

module.exports = {
  // put the processors here
  processors: {
    html,
    css,
    jsStrings,
    yourProcessor,
  },
  // set bindings - assign file extensions to the processors specified above
  bindings: {
    html: ["html", "pug"],
    css: ["css"],
    jsStrings: ["js"],
    yourProcessor: ["vue", "jsx"],
  },
  // put heree classes and ids that you don't want to be minified
  ignores: {
    classes: ["class", "another_class"],
    ids: ["id", "another-id"],
  },
};
```

### Processors

ShorterCSS relies on processors. Processors are just functions that follow the scheme below:

```ts
function(file: string, classLibrary: LibraryInstance, idLibrary: LibraryInstance): string {
  // your beutiful code
  return TersedFile
};
```

**LibraryInstance** is an istance of the Library class:

```ts
interface LibraryInstance {
  _library: LibraryType;
  _ignores: Array<string>;
  size: number;
  has(name: string): boolean;
  get(name: string, dontCount?: boolean): string; // use this to get a shortname of a class or id
  getAll(): Array<string>;
  getUnused(): Array<string>;
  getSize(): number;
  getFullNames(): Array<string>;
  stats(): { size: number; unused: number };
}
```

Still not sure? Jump into the (project's src folder)[https://github.com/Matb85/shortercss/tree/master/src], or raise an (issue)[https://github.com/Matb85/shortercss/issues]!

#### Creating processors

Of course, you don't have to rely on the built-in processors. Just create a function like the one above and put it in the config.

#### Available processors

##### Regex-based:

- html (built-in)
- css (built-in)
- jsStrings (built-in)

**Have you created a processor? Share it with us** :smiley:

### Contributing

Sure, if you think you can improve this project, go ahead! But, just three little things:

- use [Typescript][1] where possible
- follow [Conventional Commit's specification][2]

[1]: https://www.typescriptlang.org/
[2]: https://www.conventionalcommits.org/en/v1.0.0/
