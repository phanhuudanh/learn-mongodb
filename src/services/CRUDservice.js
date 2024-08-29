const connection = require('../config/database');

const getAllUsers = async () => {
    const [results ,fields] = await connection.query('select * from Users');
    return results;
}
const getUserByID = async (userID) => {
    const [results, fields] = await connection.query('select * from Users where id = ?', [userID]);
    let user = results && results.length > 0 ? results[0] : {};
    return user;
}
const updateUserByID = async (userID, newemail, newname, newcity) => {
    const [results, fields] = await connection.query(`
        UPDATE Users
        SET email=?, name=?, city=?
        where id=?
        `,
        [newemail, newname, newcity, userID]
    )
}
const deleteUserByID = async (id) => {
    const [results, fields] = await connection.query(
        `DELETE FROM Users where id=?`,[id]
    )
}
module.exports = {
    getAllUsers, getUserByID, updateUserByID, deleteUserByID
}