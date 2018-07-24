# Bookshelf Strip Save

This plugin works with Bookshelf.js, available here http://bookshelfjs.org. This plugin will automatically strip
any attributes set on a model that's not the name of a column of its associated table before it's saved.
This is useful for example if you are receiving "dirty" data.

It does this by relying on `bookshelf-column-cache` to check for a whitelist of valid column names.

requires async syntax to work.

## Installation
``` javascript
npm install bookshelf-strip-save bookshelf-column-cache
```
Then in your bookshelf configuration:
``` javascript
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin(require('bookshelf-strip-save');
bookshelf.plugin(require('bookshelf-column-cache');
```