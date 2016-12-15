var _ = require("lodash");
var Promise = require('bluebird');
var HashSet = require("native-hashset");

var table_columnNames = new Map();
var tablesQueried = new HashSet.String();
var tableName_resolvers = new Map();

function getColumnsForTable(Bookshelf, tableName){
    var knex = Bookshelf.knex;

    if (!tablesQueried.contains(tableName)) {
        tablesQueried.add(tableName);
        tableName_resolvers.set(tableName, []);

        return knex(tableName)
        .columnInfo()
        .then(function(columnsObject){
            var columnsArray = [];
            _.forEach(columnsObject, function(value, key){
                columnsArray.push(key);
            });
            //add results to a map to keep in memory so that we only ever have to do the informational query once
            table_columnNames.set(tableName, columnsArray);
            var columnNames = table_columnNames.get(tableName)

            var resolvables = tableName_resolvers.get(tableName);
            _.forEach(resolvables, function(resolve){
                resolve(columnNames)
            })
            tableName_resolvers.delete(tableName);
            return Promise.resolve(columnNames)
        });
    } else if (!table_columnNames.get(tableName)){

        var promise = new Promise(function(resolve, rej){
            tableName_resolvers.get(tableName).push(resolve)
        })
        return promise;
    } else {
        return Promise.resolve(table_columnNames.get(tableName));
    }
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