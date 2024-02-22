const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require('path')
const {v4: uuid} = require("uuid")

const User = require('../models/userModel');
const HttpError = require('../models/errorModel');

// REGISTER A NEW USER
// Post request : api/users/register
// UNPROTECTED
const registerUser = async (req, res, next) => {
    try {
        // console.log('Request Body:', req.body);
        const { name, email, password, password2 } = req.body;
        // console.log('Received Email:', email);

        if (!name || !email || !password || !password2) {
            return next(new HttpError('Fill in all fields.', 422));
        }

        const newEmail = email.toLowerCase();

        const emailExists = await User.findOne({ email: newEmail });
        if (emailExists) {
            return next(new HttpError('Email already exists.', 422));
        }

        if ((password.trim()).length < 6) {
            return next(new HttpError('Password should be at least 6 characters', 422));
        }

        if (password !== password2) {
            return next(new HttpError('Passwords do not match. Please make sure the passwords match.', 422));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await User.create({ name, email: newEmail, password: hashedPass });
        console.log(newUser)
        res.status(201).json(newUser);
    } catch (error) {
        return next(new HttpError('User registration failed.', 422));
    }
};

// LOGIN As REGISTERED USERS
// Post request : api/users/login
// UNPROTECTED
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log('Received email:', email);
        console.log('Received password:', password);
        
        if (!email || !password) {
            return next(new HttpError("Fill in all fields", 422));
        }
        
        const newEmail = email.toLowerCase();
        console.log('Normalized email:', newEmail);
        
        const user = await User.findOne({ email: newEmail });
        if (!user) {
            return next(new HttpError("Invalid credentials1", 422));
        }
        
        console.log('Hashed password:', user.password); // Log the hashed password retrieved from the database
        
        const comparePass = await bcrypt.compare(password, user.password);
        console.log('Comparison result:', comparePass); // Log the result of the password comparison
        
        if (!comparePass) {
            console.log('Password comparison failed');
            return next(new HttpError("Invalid credentials2", 422));
        }
        
        const { _id: id, name } = user;
        const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: "1d" });
        
        res.status(200).json({ token, id, name });
    } catch (error) {
        console.error('Login error:', error);
        return next(new HttpError("Login failed. Please check your credentials", 422));
    }
};


// user profile
// Post request : api/users:id
// UNPROTECTED
const getUser = async (req, res, next) => {
    try {
        const {id} =  req.params
        const user = await User.findById(id).select('-password');
        if(!user){
            return next(new HttpError("User not found", 404))
        }
        res.status(200).json(user);
    } catch (error) {
        return next(new HttpError(error))

    }
};















// change users avatar profile picture
// Post request : api/users/change-avatar
// UNPROTECTED
const changeAvatar = async (req, res, next) => {
    try {
        if(!req.files.avatar){
            return next(new HttpError("please choose an image.",422))
        }

        //find user from database
        const user = await  User.findById(req.user.id)
        //delete old avatar if exists
        if(user.avatar){
            const avatarPath = path.join(__dirname, '..','uploads', user.avatar);
            if(fs.existsSync(avatarPath)){
                fs.unlink(avatarPath, (err)=>{
                    if(err){
                        return next (new HttpError(err));
                    }
                })
            }
        }

        const {avatar} = req.files;

        //check file size
        if(avatar.size > 500000) {
            return next(new HttpError("profile picture too big. Should be less than 500kb"),422)
        }

        let fileName = avatar.name;
        let splittedFilename = fileName.split('.');
        let newFilename = splittedFilename[0] + uuid() + '.' + splittedFilename[splittedFilename.length - 1];

        avatar.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
            if (err) {
                return next(new HttpError(err));
            }

            const updatedAvatar = await User.findByIdAndUpdate(req.user.id, { avatar: newFilename }, { new: true });
            if (!updatedAvatar) {
                return next(new HttpError("Avatar couldn't be changed.", 422));
            }
            res.status(200).json(updatedAvatar);
        });
    } catch (error) {
        return next(new HttpError(error));
    }
};










// EDIT USERS DETAILS
// Post request : api/users/edit-user
// PROTECTED
const editUser = async (req, res, next) => {
    try {
        const{name,email,currentPassword, newPassword, confirmNewPassword} = req.body;
        if(!name || !email || !currentPassword || !newPassword || !confirmNewPassword){
            return next(new HttpError("fill in all fields.", 422))
        }
        

        //get user from database
        const user = await User.findById(req,user,id);
        if(!user){
            return next(new HttpError("User not found.", 403))
        }

        //make sure new email donnest already exist
        const emailExist = await User.findById({email});
        //we want to update other details with/without chnaging the email (which is unnique id beacause we use 
        // it to login).
        if(emailExist && (emailExist._id != req.suer.id)){
            return next(new HttpError("email already exist..", 422))
        }
        //compare current password db password 
        const validateUserPassword = await bcrypt.compare(currentPassword, user.password);
        if(!validateUserPassword){
            return next(new HttpError("invalid current password .", 422))
        }

        //comapre new password
        if(newPassword !== confirmNewPassword) {
            return next(new HttpError("new passwords do not match.",422))

        }

        //hash new password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPassword, salt);

        //update user info in database
        const newInfo = await User.findByIdAndUpdate(req.user.id, {name, email, password :hash}, {new:true})
        res.status(200).json(newInfo)
    } catch (error) {
        return next(new HttpError(error))
        
    }
};








// get authors
// Post request : api/users/edit-user
// UNPROTECTED
const getAuthors = async (req, res, next) => {
    try {
        const authors = await User.find().select('-password');
        res.json(authors);
    } catch (error) {
        return next(new HttpError(error))
    }
};











module.exports = {
    registerUser,
    loginUser,
    getAuthors,
    getUser,
    changeAvatar,
    editUser,
};
