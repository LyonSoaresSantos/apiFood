module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            database: 'foodApp',
            user: 'postgres',
            password: '3060'
        },
        pool: {
            min:2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
}