const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'I am new User'
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }]
})

module.exports = mongoose.model('User', userSchema)