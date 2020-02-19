import Promise from 'bluebird'; 
import pg from 'pg-promise';
import 'dotenv/config';

const initOptions = {
    promiseLib: Promise
};
const pgp = pg(initOptions);
// console.log(process.env.POSTGRES_URL);
const db = pgp(process.env.POSTGRES_URL)

export default db;