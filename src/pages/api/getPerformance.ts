import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { Performance } from '@prisma/client'

type Data = {
    performance: Performance[]
    error: string | null
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const performance = await prisma.performance.findMany({
        take: 7,
        orderBy: {
            updatedAt: 'asc'
        }
    })
    res.status(200).json({performance, error: null})
}