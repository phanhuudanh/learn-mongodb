const connection = require('../config/database');
const { getAllUsers, getUserByID, updateUserByID, deleteUserByID } = require('../services/CRUDservice');

const getHomePage = async (req ,res) => {
    const results = await getAllUsers();
    return res.render("home", {listUsers: results});
}

const postCreateUser = async (req, res) => {
    let email = req.body.email;
    let name= req.body.myname;
    let city=req.body.city;
    const [results, feilds] = await connection.query(
        `INSERT INTO Users(email, name, city) VALUES(?,?,?)`,[email,name,city]
    );
    res.send('create user succeed!')
}
const postUpdateUser = async (req, res) => {
    let email= req.body.email;
    let id=req.body.userid;
    let name= req.body.myname;
    let city= req.body.city;
    await updateUserByID(id,email,name,city)
    res.redirect('/');
}
const createUserPage= (req, res) => {
    return res.render('create.ejs');
}

const updateUserPage= async (req, res) => {
    const userID = req.params.id;
    const user = await getUserByID(userID);
    return res.render('edit.ejs' ,{userEdit: user});
}
const postHanleRemoveUser= async (req, res) => {
    const userID = req.body.userid;
    await deleteUserByID(userID);
    res.redirect('/');
}
const postDeleteUser = async (req, res) => {
    const userID =req.params.id;
    const user= await getUserByID(userID);
    return res.render('delete.ejs', {userEdit: user});
}
module.exports = {
    getHomePage, postCreateUser, createUserPage, updateUserPage, postUpdateUser, postHanleRemoveUser, postDeleteUser
}