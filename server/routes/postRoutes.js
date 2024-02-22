const { Router } = require('express')
const {
    CreatePost,
    getCatPosts,
    getPosts,
    getSinglePost,
    getUserPosts,
    editPost,
    deletePost
    
} = require("../controllers/postController")
const middleware = require("../middleware/authMiddleware");
const authModdleware = require('../middleware/authMiddleware');

const router = Router()

router.post('/',authModdleware,CreatePost);
router.get('/',getPosts);
router.get('/:id',getSinglePost);
router.get('/categories/:category',getCatPosts);
router.get('/users/:id',getUserPosts);
router.patch('/:id',authModdleware,editPost);
router.delete('/:id',authModdleware,deletePost);

module.exports = router 