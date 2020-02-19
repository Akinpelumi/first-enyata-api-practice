import queries from './queries'
var promise = require('bluebird');
var pg = require('pg-promise')
import 'dotenv/config'

var options = {
    promiseLib: promise
};

var pgp = pg(options);
const db = pgp(process.env.POSTGRES_URL);

export {
    db,
    queries
}
