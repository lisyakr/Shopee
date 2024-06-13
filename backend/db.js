const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    password: 'akula1029',
    host: 'localhost',
    port: 5432,
    database: 'shoppee',
});

module.exports = pool;
