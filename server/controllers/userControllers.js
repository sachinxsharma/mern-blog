const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require("uuid");

const User = require('../models/userModel');
const HttpError = require('../models/errorModel');

// REGISTER A NEW USER
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, password2 } = req.body;

        if (!name || !email || !password || !password2) {
            return next(new HttpError('Fill in all fields.', 422));
        }

        const newEmail = email.toLowerCase();
        const emailExists = await User.findOne({ email: newEmail });

        if (emailExists) {
            return next(new HttpError('Email already exists.', 422));
        }

        if (password.trim().length < 6) {
            return next(new HttpError('Password should be at least 6 characters', 422));
        }

        if (password !== password2) {
            return next(new HttpError('Passwords do not match.', 422));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await User.create({ name, email: newEmail, password: hashedPass });
        
        res.status(201).json(newUser);
    } catch (error) {
        return next(new HttpError('User registration failed.', 422));
    }
};

// LOGIN AS REGISTERED USERS
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return next(new HttpError("Fill in all fields", 422));
        }
        
        const newEmail = email.toLowerCase();
        const user = await User.findOne({ email: newEmail });

        if (!user) {
            return next(new HttpError("Invalid credentials1", 422));
        }

        const comparePass = await bcrypt.compare(password, user.password);

        if (!comparePass) {
            return next(new HttpError("Invalid credentials2", 422));
        }

        const { _id: id, name } = user;
        const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: "1d" });
        
        res.status(200).json({ token, id, name });
    } catch (error) {
        return next(new HttpError("Login failed. Please check your credentials", 422));
    }
};

// GET USER PROFILE
const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password');
        
        if (!user) {
            return next(new HttpError("User not found", 404));
        }
        
        res.status(200).json(user);
    } catch (error) {
        return next(new HttpError(error.message || "Failed to fetch user.", 500));
    }
};

// CHANGE USER'S AVATAR PROFILE PICTURE
const changeAvatar = async (req, res, next) => {
    try {
        // Check if avatar file is provided
        if (!req.files.avatar) {
            return next(new HttpError("Please choose an image.", 422));
        }

        // Find user from database
        const user = await User.findById(req.user.id);

        // Delete old avatar if exists
        if (user.avatar) {
            const avatarPath = path.join(__dirname, '..', 'uploads', user.avatar);
            if (fs.existsSync(avatarPath)) {
                fs.unlinkSync(avatarPath);
            }
        }

        const { avatar } = req.files;

        // Check file size
        if (avatar.size > 500000) {
            return next(new HttpError("Profile picture too big. Should be less than 500kb", 422));
        }

        const fileName = avatar.name;
        const newFilename = `${uuid()}.${fileName.split('.').pop()}`;

        avatar.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
            if (err) {
                return next(new HttpError(err.message || "Failed to upload avatar.", 500));
            }

            const updatedAvatar = await User.findByIdAndUpdate(req.user.id, { avatar: newFilename }, { new: true });
            if (!updatedAvatar) {
                return next(new HttpError("Avatar couldn't be changed.", 422));
            }
            
            res.status(200).json(updatedAvatar);
        });
    } catch (error) {
        return next(new HttpError(error.message || "Failed to change avatar.", 500));
    }
};

// EDIT USER DETAILS
const editUser = async (req, res, next) => {
    try {
        const { name, email, currentPassword, newPassword, confirmNewPassword } = req.body;

        if (!name || !email || !currentPassword || !newPassword || !confirmNewPassword) {
            return next(new HttpError("Fill in all fields.", 422));
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new HttpError("User not found.", 403));
        }

        const emailExist = await User.findOne({ email });
        if (emailExist && emailExist._id != req.user.id) {
            return next(new HttpError("Email already exists.", 422));
        }

        const validateUserPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validateUserPassword) {
            return next(new HttpError("Invalid current password.", 422));
        }

        if (newPassword !== confirmNewPassword) {
            return next(new HttpError("New passwords do not match.", 422));
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);

        const newInfo = await User.findByIdAndUpdate(req.user.id, { name, email, password: hash }, { new: true });
        res.status(200).json(newInfo);
    } catch (error) {
        return next(new HttpError(error.message || "Failed to edit user.", 500));
    }
};

// GET ALL AUTHORS
const getAuthors = async (req, res, next) => {
    try {
        const authors = await User.find().select('-password');
        res.json(authors);
    } catch (error) {
        return next(new HttpError(error.message || "Failed to fetch authors.", 500));
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUser,
    changeAvatar,
    editUser,
    getAuthors,
};
