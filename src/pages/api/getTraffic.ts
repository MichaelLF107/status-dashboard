import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { Traffic } from '@prisma/client'

type Data = {
    traffic: Traffic[]
    error: string | null
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const traffic = await prisma.traffic.findMany({
        take: 7,
        orderBy: {
            updatedAt: 'asc'
        }
    })
    res.status(200).json({traffic, error: null})
}