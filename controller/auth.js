const User = require('../model/user')
const bycrypt = require('bcryptjs')
const { validationResult } = require('express-validator')

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
    }).catch(error => {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    })
}