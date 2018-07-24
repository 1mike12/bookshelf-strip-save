const bookshelf = require("./database").bookshelf;

class User extends bookshelf.Model {

    //puts this gettable attribute one prototype chain up, where bookshelf expects it to be
    get tableName(){
        return User.TABLE_NAME
    }
}

User.TABLE_NAME = "users";

module.exports = User;