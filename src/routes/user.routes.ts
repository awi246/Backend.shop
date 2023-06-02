/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import {
    addUsers,
    deleteUser,
    getUsers,
    updateUser,
} from '../controllers/user.controller'
import { createPostDtop, putUser } from '../validators/user.validator'
import { validate } from '../utils/validate'
import { login } from '../services/user.services'

const router = Router()

router.get('/', getUsers)

router.post('/login', async (req, res, next) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { email, password }: { email: string; password: string } =
            req.body
        const { token } = await login(email, password)
        res.json(token)
    } catch (error) {
        next(error)
    }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.post('/register', validate(createPostDtop), addUsers)

router.delete('/:id', deleteUser)

router.put('/update/:id', validate(putUser), updateUser)

export default router
