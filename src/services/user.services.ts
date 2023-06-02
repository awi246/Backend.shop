/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Boom from '@hapi/boom'
import { PrismaClient } from '@prisma/client'
import * as jwt from 'jsonwebtoken'
import { scryptSync } from 'crypto'

const prisma = new PrismaClient()

export const find = async () => {
    const users = await prisma.user.findMany()
    return users
}
const getHash = (password: string) =>
    scryptSync(password, '', 32).toString('hex')

const comparePassword = (password: string, hashedPassword: string): boolean => {
    const inputHash = getHash(password)
    return inputHash === hashedPassword
}

export const create = async (users: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { email, name, password } = users
    const hashedPassword = getHash(password) // Hash the password using the getHash function

    const user = await prisma.user.create({
        data: {
            id: Math.ceil(Math.random() * 100),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            email,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            password: hashedPassword,
        },
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return

    const userData = {
        ...user,
        password: undefined,
    }

    return userData
}

export const remove = async (id: string) => {
    try {
        return await prisma.user.delete({
            where: {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                id: Number(id),
            },
        })
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw Boom.notFound('User Id not found')
        } else {
            throw error
        }
    }
}

export const update = async (user: any, id: string) => {
    const { email, name, password } = user

    try {
        await prisma.user.update({
            where: { id: Number(id) },
            data: { email, password },
        })
    } catch (error) {
        console.log('error =>', error)
    }
}

export async function login(email: string, password: string) {
    const user = await prisma.user.findFirstOrThrow({ where: { email } })

    // Compare the provided password with the stored hashed password
    const passwordMatch = comparePassword(password, user.password)

    if (!passwordMatch) {
        // Password does not match
        // If you want to throw a http error, you can. This is throw internal server error
        throw Error('Password not correct')
    }

    // Generate a token

    const token = jwt.sign(
        { userId: user.id, isAdmin: true },
        'random-secret',
        {
            expiresIn: '1h',
        }
    )

    // Return the token to the client
    return { success: true, token }
}
