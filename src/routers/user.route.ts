import { Router } from 'express'

import {
  getUser,
  deleteUser,
  updateUser,
  loginUser,
} from '../controllers/user.controller'
import { createPostDto } from '../validators/user.validator'
import * as postController from '../controllers/user.controller'
import { validate } from '../utils/validate'
import { authenticateToken } from '../middleware/authentication.middleware'
import { isAdmin } from '../middleware/authentication.middleware'
const router = Router()

router.get('/', authenticateToken, isAdmin, getUser)

router.post('/', validate(createPostDto), postController.createUser)

router.delete('/:id', deleteUser)
router.patch('/:id', updateUser)

router.post('/signup')
router.post('/login', loginUser)

export default router
