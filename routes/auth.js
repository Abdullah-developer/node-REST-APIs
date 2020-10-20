const express = require('express') 
const { body } = require('express-validator')
const User = require('../model/user')

const authController = require('../controller/auth')
const router = express.Router();

router.put('/signup', [
    body('email').isEmail().withMessage('Please Enter Valid E-Mail').custom(value => {
        return User.findOne({email: value}).then(user => {
            if (user) {
                return Promise.reject('E-Mail is Exist, try Another One')
            }
        })
    }).normalizeEmail(),
    body('password').trim().isLength({min: 5}),
    body('name').trim().not().isEmpty()
], authController.signup)

router.post('/login', authController.login)

module.exports = router;