module.exports = {
    //Querys user
    getUsers:'SELECT * FROM app_user ORDER BY user_id ASC',
    getLogin: 'SELECT * FROM app_user WHERE username = $1',
    createUser: 'INSERT INTO app_user (username, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING *',
    updateUser: 'UPDATE app_user SET username = $1, email = $2, password = $3, phone = $4 WHERE user_id = $5 RETURNING *',
    deleteUser: 'DELETE FROM app_user where user_id = $1',

    // Verification Code 
    createCode: 'INSERT INTO code (verification_code) VALUES ($1) RETURNING *',
    deleteCode: 'DELETE FROM code where verification_code = $1'
}