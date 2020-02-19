import db from '..';

const createUserTable = () => (`
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
`);

const createPostTable = () => (`
    CREATE TABLE IF NOT EXISTS posts(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    heading VARCHAR(255) NOT NULL,
    post TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);
`);

const createTables = async(...queries) => {
    const query = queries.reduce((prevQuery, currQuery) => prevQuery + currQuery);
    return db.query(query);
};

const create = createTables(createUserTable(), createPostTable());

export default create;


