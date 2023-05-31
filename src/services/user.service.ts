import Boom from '@hapi/boom'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
export const getUser = async (user: any) => {
  const users = await prisma.user.findMany({
    select: { id: true, address: true, name: true },
  })
  return users
}

export const createUser = async (user: any) => {
  const { name, email, address, password } = user
  const createdUser = await prisma.user.create({
    data: {
      id: Math.ceil(Math.random() * 100),
      name,
      email,
      address,
      password: await bcrypt.hash(password as string, 10),
    },
  })
  return { ...createdUser, password: undefined }
}
export const deleteUser = async (user: any) => {
  const { id } = user
  try {
    return await prisma.user.delete({
      where: {
        id: Number(id),
      },
    })
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw Boom.notFound('user not found')
    } else {
      throw error
    }
  }
}

export const updateUser = async (id: string, user: any) => {
  const { name, address, email, password } = user
  try {
    return await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        id: Math.ceil(Math.random() * 100),
        name,
        address,
        email,
        password,
      },
    })
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw Boom.notFound('user not found')
    } else {
      throw error
    }
  }
}
export async function loginUser(email: string, password: string) {
  let user: any
  try {
    user = await prisma.user.findFirstOrThrow({ where: { email } })
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw Boom.notFound('User xaina sathi')
    }
  }
  //compare the provided password with the stored hash password
  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    throw new Error('password not correct')
  }

  //Generate a token

  const token = jwt.sign({ userId: user.id }, 'random-secret', {
    expiresIn: '1h',
  })

  return token
}
