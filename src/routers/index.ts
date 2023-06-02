import userRoutes from './user.route'
import { Router } from 'express'

const router = Router()

router.use('/users', userRoutes)

export default router
