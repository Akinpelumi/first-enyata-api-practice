export const userQueries = {
    allUsers: 'SELECT * FROM users;',
    oneUser: 'SELECT * FROM users WHERE id = $1;',
    createUser: `INSERT INTO users(first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id;`,
    getUserByEmail: `SELECT * FROM users WHERE email = $1`
}

export const postQueries = {
    allPosts: 'SELECT * FROM posts;',
    onePost: 'SELECT * FROM posts WHERE id = $1;',
    allOwnPosts: 'SELECT * FROM posts WHERE user_id = $1;',
    createPost: `INSERT INTO posts(user_id, heading, post) VALUES ($1, $2, $3) RETURNING id;`,
    updatePost: `UPDATE posts SET heading=$1, post=$2 WHERE id=$3;`,
    deletePost: `DELETE FROM posts WHERE id=$1;`
}
