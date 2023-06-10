const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const JsonWebToken = require('jsonwebtoken');

module.exports = {
    registerUser: async  (request, response) => {
        const doesTheUserAlreadyExist = await User.findOne({email: request.body.email});

        if (doesTheUserAlreadyExist !== null) {
            return response.status(400).json({email: "Email already Exists"});
        }

        const userCreation = await User.create({fullName: request.body.fullName, email: request.body.email, password: request.body.password, confirmPassword: request.body.confirmPassword}).catch(err=> response.status(400).json(err));
        
        if (userCreation === undefined) {
            return null;
        }

        const tokenContents = {
            userId: userCreation._id,
            userName: userCreation.fullName
        }

        const userToken = JsonWebToken.sign(tokenContents, process.env.Project_key);

        response
            .cookie("userToken", userToken, {httpOnly: true})
            .status(200)
            .json({cookieMessage: "Cookie Created", user: tokenContents});
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
            .json({cookieMessage: "Cookie Created", user: tokenContents});
    }, 


    updateUser: async (request, response) => {
        const activeUserToken = JsonWebToken.decode(request.cookies.userToken);
        
        const willTheUserUpdate = await User.findOneAndUpdate({_id: activeUserToken.userId}, request.body, {new: true, runValidators: true}).catch(err => response.status(400).json(err));

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

        const userDeletion = await User.deleteOne({_id: activeUserToken.userId}).catch(err => response.status(400).json(err));

        response
            .clearCookie('userToken')
            .status(200)
            .json("Account Deleted");
    }
}