const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String, 
        required: [true, 'Please provide your name']
    },

    email: {
        type: String,
        required: [true, 'Please provide your email'],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },

    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minlength: [8, 'Your password must be longer than 8 characters']
    }
}, {timestamps: true});

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set( value => this._confirmPassword = value);

UserSchema.pre('validate', function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password and Confirm Password must match');
    }
    next();
})

UserSchema.pre('save', function(next) {
    if(this.isModified(this.password) || this.isNew) {
        bcrypt.hash(this.password, 10) 
            .then(hash => {
                this.password = hash;
                next();
            });
    } else {
        next();
    }
})

const User = mongoose.model('User', UserSchema);
module.exports = User;