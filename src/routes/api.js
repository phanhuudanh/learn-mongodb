const express = require('express');
const { getUsersAPI, postCreateUserAPI, putUpdateUserAPI, deleteUserAPI, postUploadSingleFileAPI, postUploadMultipleFileAPI } = require('../controllers/apiController');
const { postCreateCustomer, postCreateArrayCustomer, getAllCustomer, putUpdateCustomer, deleteACustomer, deleteArrayCustomer } = require('../controllers/customerController');
const apiRouter = express.Router();

apiRouter.get('/users', getUsersAPI)
apiRouter.post('/users', postCreateUserAPI)
apiRouter.put('/users', putUpdateUserAPI)
apiRouter.delete('/users', deleteUserAPI)

apiRouter.post('/file', postUploadSingleFileAPI)
apiRouter.post('/files', postUploadMultipleFileAPI)

apiRouter.get('/customers', getAllCustomer)
apiRouter.post('/customers', postCreateCustomer)
apiRouter.post('/customers-many', postCreateArrayCustomer)
apiRouter.put('/customers', putUpdateCustomer)
apiRouter.delete('/customers', deleteACustomer);
apiRouter.delete('/customers-many', deleteArrayCustomer)

module.exports = apiRouter;