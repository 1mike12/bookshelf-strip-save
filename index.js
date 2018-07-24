const _ = require("lodash");
const stripExtraneousAttributes = require("./stripExtraneousAttributes");

module.exports = function(Bookshelf){

    const proto = Bookshelf.Model.prototype;
    Bookshelf.Model = Bookshelf.Model.extend({

        save: async function(key, value, options){

            let ColumnCache = Bookshelf.ColumnCache;
            if (!ColumnCache) throw new Error("plugin bookshelf-column-cache not found. Did you remember to add this to the plugins?");
            const self = this;

            //copied junk from model.js save() to have attrs obj built identically
            let attrs = {};

            // Handle both `"key", value` and `{key: value}` -style arguments.
            if (key == null || typeof key === "object"){
                attrs = key && _.clone(key) || {};
                options = _.clone(value) || {};
            } else {
                (attrs = {})[key] = value;
                options = options ? _.clone(options) : {};
            }
            //------------------

            const tableName = this.constructor.prototype.tableName;
            let columnsSet = await ColumnCache.getColumnsForTable(tableName);
            stripExtraneousAttributes(columnsSet, self.attributes);
            return proto.save.call(self, attrs, options);
        }
    })
};