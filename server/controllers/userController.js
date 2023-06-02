const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const JsonWebToken = require('jsonwebtoken');

module.exports = {
    registerUser: async  (request, response) => {
        const doesTheUserAlreadyExist = await User.findOne({email: request.body.email});

        if (doesTheUserAlreadyExist !== null) {
            return response.status(400).json({email: "Email already Exists"});
        }

        const clearedToCreateUser = await User.create(request.body).catch(err=> {response.status(400).json(err);});
        
        if (clearedToCreateUser === undefined) {
            return null;
        }

        const tokenContents = {
            userId: clearedToCreateUser._id,
            userName: clearedToCreateUser.fullName
        }

        const userToken = JsonWebToken.sign(tokenContents, process.env.Project_key);

        response
            .cookie("userToken", userToken, {httpOnly: true})
            .status(200)
            .json({cookieMessage: "Cookie Created", user: clearedToCreateUser});
    },


    loginUser: async (request, response) => {
        const doesTheUserExist = await User.findOne({email: request.body.email});

        if (doesTheUserExist === null) {
            return response.status(400).json({message: "Email is incorrect"});
        }

        if (request.body.password === undefined) {
            return response.status(400).json({message: "Please fill out the password"});
        }

        const doesThePasswordMatchTheDatabasePassword = await bcrypt.compare(request.body.password, doesTheUserExist.password);

        if (doesThePasswordMatchTheDatabasePassword === false) {
            return response.status(400).json({message: "Password is incorrect"});
        }

        const tokenContents = {
            userId: doesTheUserExist._id,
            userName: doesTheUserExist.fullName
        }

        const userToken = JsonWebToken.sign(tokenContents, process.env.Project_key);

        response
            .cookie("userToken", userToken, {httpOnly: true})
            .status(200)
            .json({cookieMessage: "Cookie Created", user: doesTheUserExist});
    }, 


    updateUser: async (request, response) => {
        const activeUserToken = JsonWebToken.decode(request.cookies.userToken);
        const userId = activeUserToken.userId;
        
        const willTheUserUpdate = await User.findOneAndUpdate({_id: userId}, request.body, {new: true, runValidators: true}).catch(err => response.status(400).json(err));

        response
            .status(200)
            .json({user: willTheUserUpdate});
    },

    
    logout: async (request, response) => {
        response
            .clearCookie('userToken')
            .status(200)
            .json('logged out');
    },


    deleteUser: async (request, response) => {
        const activeUserToken = JsonWebToken.decode(request.cookies.userToken);
        const userId = activeUserToken.userId;

        const userDeletion = await User.deleteOne({_id: userId}).catch(err => response.status(400).json(err));

        response
            .clearCookie('userToken')
            .status(200)
            .json("Account Deleted");
    }
}