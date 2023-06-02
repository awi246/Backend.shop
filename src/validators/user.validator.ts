import { z } from 'zod'

export const createPostDtop = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Title is required',
        }),
        email: z
            .string({
                required_error: 'Email is required',
            })
            .email('Not a valid email'),
    }),
})

export const putUser = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }),
        email: z
            .string({
                required_error: 'Email is required',
            })
            .email('Not a valid email'),
    }),
})
