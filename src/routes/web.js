const express= require('express');
const router = express.Router();
const { getHomePage, postCreateUser, createUserPage, updateUserPage, postUpdateUser, postHanleRemoveUser, postDeleteUser } = require('../controllers/homeControllers')

router.get("/", getHomePage)
router.get('/update/:id', updateUserPage)

router.get('/createuser', createUserPage)
router.post('/create-user', postCreateUser)

router.post('/update-user', postUpdateUser)

router.post('/delete-user', postHanleRemoveUser)
router.post('/delete-user/:id', postDeleteUser)
module.exports = router;