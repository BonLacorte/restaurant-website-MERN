const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: validator.isEmail,
        },
        password: {
            type: String,
            required: true
        },
        roles: [{
            type: String,
            enum: ['Admin', 'Employee', 'Customer'],
            default: 'Customer'
        }],
        mobileNumber: {
            type: String,
            validate: {
                validator: function(v) {
                    return /^(\+?63|0)9\d{9}$/.test(v); // Philippine number format
                },
                message: props => `${props.value} is not a valid phone number!`
            },
            required: [true, 'User phone number required']
        }
        // Add avatar / image of the user
    }, 
    { 
        timestamps: true 
    }
);

    // active: {
    //     type: Boolean,
    //     default: true
    // }


module.exports = mongoose.model('User', userSchema)