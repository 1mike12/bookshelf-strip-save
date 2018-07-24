const TABLE_NAME = require("../test/User").TABLE_NAME;

module.exports = {
    up: (knex, Promise) =>{
        return knex.schema.createTableIfNotExists(TABLE_NAME, function(table){
            table.increments();
            table.string("name");
        });
    },
    down: (knex, Promise) =>{
        return knex.schema.dropTableIfExists(TABLE_NAME)
    }
};