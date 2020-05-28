const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true  //removes leading and trailing white space
    },
    email: {
        type: String,
        required: true,
        trim: true, //removes leading and trailing white space
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,

        // mongoose allows you to write custom validation into the model
        // cnpm validator.js is a good library which will give you more validation
        // features
        validate(value) {
            if (value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    password: {
        //toDo:  fix plaintext storage
        //toDo:  check no spaces
        type: String,
        required: true,
        trim: true,
        validate(value){
            if (value.length < 6){
                throw new Error('Password must be at least 6 characters long')
            }
            if (validator.contains(value, 'password')) {
                throw new Error('Password cannot contain the word \'password\'')
            }
        }
    }
})

module.exports = User