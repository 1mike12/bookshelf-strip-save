
module.exports = {
    test: {
        client: 'sqlite3',
        connection: {
            filename: ":memory:"
        },
        migrations: {
            tableName: 'migrations',
            directory: './migrations'
        },
        seeds: {
            directory: './migrations/seeds'
        },
        debug: true

    },
    development: {
        client: 'sqlite3',
        connection: {
            filename: ":memory:"
        },
        migrations: {
            tableName: 'migrations',
            directory: './migrations'
        },
        seeds: {
            directory: './migrations/seeds'
        },
        debug: true

    },
};