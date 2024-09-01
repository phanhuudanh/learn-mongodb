const connection = require('../config/database');
const User = require('../model/user');
const { getAllUsers, getUserByID, updateUserByID, deleteUserByID } = require('../services/CRUDservice');

const getHomePage = async (req ,res) => {
    const results = await User.find({});
    return res.render("home", {listUsers: results});
}

const postCreateUser = async (req, res) => {
    let email = req.body.email;
    let name= req.body.myname;
    let city=req.body.city;
    await User.create({email: email,name: name,city: city})
    res.redirect('/')
}
const postUpdateUser = async (req, res) => {
    let email= req.body.email;
    let id=req.body.userid;
    let name= req.body.myname;
    let city= req.body.city;
    // await updateUserByID(id,email,name,city)
    await User.updateOne({_id: id}, {email:email, name:name, city:city})
    res.redirect('/');
}
const createUserPage= (req, res) => {
    return res.render('create.ejs');
}

const updateUserPage= async (req, res) => {
    const userID = req.params.id;
    // const user = await getUserByID(userID);
    const user = await User.findById(userID).exec();
    console.log(user)
    return res.render('edit.ejs' ,{userEdit: user});
}
const postHanleRemoveUser= async (req, res) => {
    const userID = req.body.userid;
    // await deleteUserByID(userID);
    await User.deleteOne({_id: userID});
    res.redirect('/');
}
const postDeleteUser = async (req, res) => {
    const userID =req.params.id;
    // const user= await getUserByID(userID);
    const user = await User.findById(userID).exec();
    console.log(user)
    return res.render('delete.ejs', {userEdit: user});
}
module.exports = {
    getHomePage, postCreateUser, createUserPage, updateUserPage, postUpdateUser, postHanleRemoveUser, postDeleteUser
}