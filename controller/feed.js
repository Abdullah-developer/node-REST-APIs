exports.getPosts = (req, res) => {
    res.status(200).json({posts: [{title: "First Post", content: "content of the first post"}]})
}
exports.createPost = (req, res) => {
    res.status(201).json({
        message: "Post Created Succefully",
        post: {
            id: new Date().toLocaleString(),
            title: req.body.title,
            content: req.body.content
        }
    })
}