const { createCustomerService, createArrayCustomerService, getAllCustomerService, updateCustomerService, deleteACustomerService, deleteArrayCustomerService } = require("../services/customerService");
const { uploadSingleFile } = require("../services/fileService");


module.exports = {
    postCreateCustomer: async (req, res) => {
        let { name, address, phone , email , description } = req.body;
        let imgUrl = '';

        // img:String
        if(!req.files || Object.keys(req.files).length === 0){
            // do nothing
        }
        else{
            let result = await uploadSingleFile(req.files.image);
            imgUrl=result.path;
        }
        let customerData = {
            name,
            address,
            phone,
            email,
            image: imgUrl,
            description
        }
        let customer = await createCustomerService(customerData);
        return res.status(200).json({
            EC:0,
            data: customer
        })
    },
    postCreateArrayCustomer: async (req, res) => {
        let customers = await createArrayCustomerService(req.body.customers);
        if(customers){
            return res.status(200).json(
                {
                    EC:0,
                    data: customers
                }
            )
        }
        else{
            return res.status.json(
                {
                    EC:-1,
                    data:customers
                }
            )
        }
    },
    getAllCustomer: async (req, res) => {
        let limit = req.query.limit;
        let page= req.query.page;
        let customers=null
        if(limit && page){
            console.log(req.query)
            customers = await getAllCustomerService(limit, page, req.query);
        }else{
            customers = await getAllCustomerService();
        }
        if(customers){
            return res.status(200).json(
                {
                    EC:0,
                    data: customers
                }
            )
        }else{
            return res.status(401).json(
                {
                    EC:-1,
                    data: customers
                }
            )
        }
    },
    putUpdateCustomer: async (req, res) => {
        let customer = await updateCustomerService(req.body);
        if(customer){
            return res.status(200).json(
                {
                    EC:0,
                    data: customer
                }
            )
        }else{
            return res.status(401).json(
                {
                    EC:-1,
                    data: customer
                }
            )
        }
    },
    deleteACustomer: async (req, res) => {
        let customerId = req.body.customerId;
        let customer = await deleteACustomerService(customerId);
        if(customer){
            return res.status(200).json(
                {
                    EC:0,
                    data: customer
                }
            )
        }else{
            return res.status(401).json(
                {
                    EC:-1,
                    data: customer
                }
            )
        }
    },
    deleteArrayCustomer: async (req, res) => {
        let customerId = req.body.customerId;
        let customers = await deleteArrayCustomerService(customerId);
        if(customers){
            return res.status(200).json(
                {
                    EC:0,
                    data: customer
                }
            )
        }else{
            return res.status(401).json(
                {
                    EC:-1,
                    data: customer
                }
            )
        }
    }
}