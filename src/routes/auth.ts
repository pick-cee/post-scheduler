import express, { Router } from 'express'
import { SignUp, LogIn, LogOut } from '../controllers/auth'
import verifyToken from '../middlewares/verifyToken'
const router: Router = express.Router()

router.post('/auth/signup', SignUp)
router.post('/auth/login', LogIn)
router.get('/auth/logout', verifyToken, LogOut)

export default router