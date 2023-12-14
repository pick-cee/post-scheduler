import express, { Router } from 'express'
import { createPost, deletePost, getAllPosts, getUserPosts, updatePost } from '../controllers/post'
import verifyToken from '../middlewares/verifyToken'
import { UpdatePostSchedule, createPostSchedule } from '../controllers/post.schedule'
const router: Router = express.Router()

router.post('/post/create', verifyToken, createPost)
router.get('/posts', getAllPosts)
router.get('/post/user-posts', verifyToken, getUserPosts)
router.put('/post/update', verifyToken, updatePost)
router.delete('/post/delete', verifyToken, deletePost)


// post schedule
router.post('/schedule/create', verifyToken, createPostSchedule)
router.put('/schedule/update', verifyToken, UpdatePostSchedule)
export default router