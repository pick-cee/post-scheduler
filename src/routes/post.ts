import express, { Router } from 'express'
import { createPost, deletePost, getAllPosts, getUserPosts, updatePost } from '../controllers/post'
import verifyToken from '../middlewares/verifyToken'
const router: Router = express.Router()

router.post('/post/create', verifyToken, createPost)
router.get('/posts', getAllPosts)
router.get('/post/user-posts', verifyToken, getUserPosts)
router.put('/post/update', verifyToken, updatePost)
router.delete('/post/delete', verifyToken, deletePost)

export default router