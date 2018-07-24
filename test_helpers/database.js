const knexFile = require("./knexFile");
const knex = require('knex')(knexFile[process.env.NODE_ENV]);
const bookshelf = require("bookshelf")(knex);
bookshelf.plugin(require("../index"));

class Database {

    static async refresh(){
        await Database.rollbackAllMigrations();
        await Database.latestMigrations();
    }

    static async rollbackAllMigrations(){
        const migrate = knex.migrate;

        let isAtBaseMigration = false;
        do {
            await migrate.forceFreeMigrationsLock();
            let migration = await migrate.currentVersion(knexFile.migrations);
            if (migration !== "none"){
                migrate.rollback(knexFile.migrations)
            } else {
                isAtBaseMigration = true;
            }
        } while (isAtBaseMigration === false);
    }

    static async latestMigrations(){
        await knex.migrate.latest();
    }
}

Database.knex = knex;
Database.bookshelf = bookshelf;

module.exports = Database;