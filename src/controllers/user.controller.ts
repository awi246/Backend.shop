import { NextFunction, Request, Response } from 'express'
import * as userService from '../services/user.service'
//import HttpStatus from 'http-status-codes'
// import { loginUser } from '../services/login.service'
export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await userService.getUser(req.body)
        res.send(data)
    } catch (e) {
        next(e)
    }
}

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const createdUser = await userService.createUser(req.body)
        res.status(201).send(createdUser)
    } catch (e) {
        next(e)
    }
}

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const deletedUser = await userService.deleteUser(req.params)
        res.status(200).send(deletedUser)
    } catch (err) {
        next(err)
    }
}

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const updatedUser = await userService.updateUser(
            req.params.id,
            req.body
        )
        res.status(200).send(updatedUser)
    } catch (err) {
        next(err)
    }
}
export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body
        const token = await userService.loginUser(email, password)
        res.send({ accessToken: token })
    } catch (err) {
        next(err)
    }
}
