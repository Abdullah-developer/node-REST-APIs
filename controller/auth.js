const User = require('../model/user')
const { validationResult } = require('express-validator')

const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signup = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new Error('Validation Failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    bycrypt.hash(password, 12).then(hashedPassword => {
        const user = new User({ name: name, email: email, password: hashedPassword })
        return user.save();
    }).then(userData => {
        res.status(201).json({ message: "User Created!", userId: userData._id, userData })
    }).catch(error => {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    })
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({email: email}).then(userData => {
        if (!userData) {
            const error = new Error('There is no user with this email..');
            error.statusCode = 401;
            throw error
        }
        loadedUser = userData
        return bycrypt.compare(password, loadedUser.password)
    }).then(isEqual => {
        if (!isEqual) {
            const error = new Error('WRONG password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({ email: loadedUser.email, name: loadedUser.name, userId: loadedUser._id}, 
            "someSuperSecretToSaveTheToken", { expiresIn: "1h" });
        res.status(200).json({ token, userId: loadedUser._id, userName: loadedUser.name })
    }).catch(error => {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    })
}