const Customer = require('../model/customers');
const aqp = require('api-query-params');

const createCustomerService = async (customerData) => {
    try{
        let result = Customer.create({
            name: customerData.name,
            address: customerData.address,
            phone: customerData.phone,
            email: customerData.email,
            image: customerData.image,
            description: customerData.description
        })
        return result;

    } catch (error){
        console.log(error);
        return null;
    }
}
const createArrayCustomerService = async (arr) => {
    try {
        let result = await Customer.insertMany(arr);
        return result;
    } catch (error) {
        console.log('>>>check error create array customer: ', error);
        return null;
    }
}
const getAllCustomerService = async (limit , page, queryString) => {
    try {
        let result = null
        if(limit && page){
            let offset = (page-1) * limit;
            let { filter } = aqp(queryString);
            delete filter.page;
            result = await Customer.find(filter).skip(offset).limit(limit).exec();
        } else{
            result = await Customer.find({});
        }
        return result;
    } catch (error) {
        console.log('>>>check error get all customer: ',error);
        return null;
    }
}
const updateCustomerService = async (newdata) => {
    let {name, address, phone, email, customerId} = newdata;
    try {
        let result = await Customer.updateOne({_id: customerId}, {name: name, email: email, address: address, phone: phone})
        return result;
    } catch (error) {
        console.log('>>>check error update customer: ', error)
        return null;
    }
}
const deleteACustomerService = async (customerId) => {
    try {
        let result = await Customer.deleteById(customerId);
        return result;
    } catch (error) {
        console.log('>>>check error delete customer: ', error);
        return null;
    }
}
const deleteArrayCustomerService= async (arr) => {
    try {
        let result = await Customer.delete({_id: {$in : arr}})
    } catch (error) {
        console.log('>>>check error delete array customer: ', error);
        return null;
    }
}
module.exports = {
    createCustomerService, createArrayCustomerService, getAllCustomerService, updateCustomerService,deleteACustomerService,
    deleteArrayCustomerService
}