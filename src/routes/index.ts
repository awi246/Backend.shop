/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { Prisma } from '@prisma/client'
import prisma from '../libs/prisma'
import userRouter from '../routes/user.routes'
import {
    authenticateToken,
    isAdmin,
} from '../middlewares/authentication.middleware'

const router = Router()

router.use('/users', userRouter)

router.get('/feed', authenticateToken, isAdmin, (req, res) => {
    res.send('working feed')
})

export default router
