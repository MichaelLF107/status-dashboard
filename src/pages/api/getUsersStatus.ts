import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { UsersStatus } from '@prisma/client'

type Data = {
    usersStatus: UsersStatus[]
    error: string | null
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const usersStatus = await prisma.usersStatus.findMany({
        take: 7,
        orderBy: {
            updatedAt: 'asc'
        }
    })
    res.status(200).json({usersStatus, error: null})
}
