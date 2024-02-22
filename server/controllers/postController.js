
// ----------- Create a post
// POST : api/posts
//PROTECTED
const CreatePost = async (req, res, next) => {
    res.json("Create Post")
}


// ------------Get all post
//GET : api/posts:id
//UNPROTECTED
const getPosts = async(req,res,next) => {
    res.json("get all post ")
}

//------------get single post
//GET: api/posts/:id
//UNPROTECTED
const getSinglePost = async(req,res,next)=>{
    res.json("geting single post" )
}

// ----------- GET POSTS BY CATEGORY
// GET : api/posts/categories/:category
//PROTECTED
const getCatPosts = async (req, res, next) => {
    res.json("get post by category")
}

// ----------- get author post
// GET : api/posts/users/:id
//UNPROTECTED
const getUserPosts = async (req, res, next) => {
    res.json("get user Post")
}


// ----------- edit post
// PATCH : api/posts/:id
//PROTECTED
const editPost = async (req, res, next) => {
    res.json("edit Post")
}



// ----------- delete post
// DELETE : api/posts:id
//PROTECTED
const deletePost = async (req, res, next) => {
    res.json("delete Post")
}

module.exports = {
    CreatePost,
    getCatPosts,
    getPosts,
    getSinglePost,
    getUserPosts,
    editPost,
    deletePost
    

}