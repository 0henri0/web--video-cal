var pg = require("pg");

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tieuluan',
    password: 'mylove116',
    port: 1612,
});

module.exports = pool;