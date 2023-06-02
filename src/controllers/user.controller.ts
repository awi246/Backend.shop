/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextFunction, Request, Response } from 'express'
import * as UserService from '../services/user.services'

export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = await UserService.find()
        res.send(data)
    } catch (error) {
        next(error)
    }
}

export const addUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const data = await UserService.create(req.body)
        res.send(data)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const data = await UserService.remove(req.params.id)
        res.send(data)
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const data = await UserService.update(req.body, req.params.id)
        res.send(data)
    } catch (error) {
        next(error)
    }
}
