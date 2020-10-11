const { validationResult } = require('express-validator')

exports.getPosts = (req, res) => {
    res.status(200).json({posts: [{
        _id: new Date().getTime(),
        title: "First Post", 
        content: "content of the first post",
        creator: {
            name: "Abdullah Hussien"
        },
        createdAt: new Date().toLocaleString(),
    }]
})
}
exports.createPost = (req, res) => {
    // Validation Result if Error is Occured
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation Failed, entered data is incorrect.',
            errors: errors.array()
        })
    }
    // Creating Post
    res.status(201).json({
        message: "Post Created Succefully",
        post: {
            _id: new Date().getTime(),
            title: req.body.title,
            content: req.body.content,
            creator: {
                name: req.body.creator.name
            },
            createdAt: new Date(),
        }
    })
}