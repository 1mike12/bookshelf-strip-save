var _ = require("lodash");
var Promise = require('bluebird');

var table_columnNames = new Map();

function getColumnsForTable(Bookshelf, tableName){
    var knex = Bookshelf.knex;

    if (!table_columnNames.get(tableName)) {
        return knex(tableName)
            .columnInfo()
            .then(function(columnsObject){
                var columnsArray = [];
                _.forEach(columnsObject, function(value, key){
                    columnsArray.push(key);
                });
                //add results to a map to keep in memory so that we only ever have to do the informational query once
                table_columnNames.set(tableName, columnsArray);
                return Promise.resolve(table_columnNames.get(tableName))
            });
    }
    return Promise.resolve(table_columnNames.get(tableName));
}


function stripExtraneousAttributes(whiteListColumns, attributes){
    _.each(attributes, function(value, key){
        if (!_.includes(whiteListColumns, key)) {
            delete attributes[key]
        }
    });
}

module.exports = function(Bookshelf){

    const proto = Bookshelf.Model.prototype;
    Bookshelf.Model = Bookshelf.Model.extend({

        save: function(key, value, options){
            var self = this;

            //copied junk from model.js save() to have attrs obj built identically
            var attrs = {};

            // Handle both `"key", value` and `{key: value}` -style arguments.
            if (key == null || typeof key === "object") {
                attrs = key && _.clone(key) || {};
                options = _.clone(value) || {};
            } else {
                (attrs = {})[key] = value;
                options = options ? _.clone(options) : {};
            }
            //------------------

            const tableName = this.constructor.prototype.tableName;
            return getColumnsForTable(Bookshelf, tableName)
                .then(function(whiteListColumns){
                    stripExtraneousAttributes(whiteListColumns, self.attributes);
                    return proto.save.call(self, attrs, options);
                });
        }
    })
};