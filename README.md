# Bookshelf Strip Save

This plugin works with Bookshelf.js, available here http://bookshelfjs.org. This plugin will automatically strip
any attributes set on an object that's not the name of a column before it is saved.
This is useful for example if you are receiving "dirty" data from apis where the json will have
superflous data that you don't need to save with your models.

It does this by checking the database
for all the valid column names for a given table. This saves you the trouble from having to keep a whitelist of allowed attributes
and manually having to remember to modify the list for each model when you make changes to the schema.


## Installation
```
    npm install bookshelf-strip-save
```
Then in your bookshelf configuration:
```
    var bookshelf = require('bookshelf')(knex);
    bookshelf.plugin(require('bookshelf-strip-save');
```