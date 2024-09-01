const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete')
const customerSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        address: String,
        phone: String,
        email: String,
        image: String,
        description: String
    },
    {
        timestamps: true
    }
)
// npm mongoose-delete giup xoa khong mat du lieu
customerSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;