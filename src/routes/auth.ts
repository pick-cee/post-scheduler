import express, { Router } from 'express'
import { SignUp } from '../controllers/auth'
const router: Router = express.Router()

router.post('/auth/signup', SignUp)


export default router