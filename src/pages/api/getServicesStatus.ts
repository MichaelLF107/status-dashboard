import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { ServiceStatus } from '@prisma/client'

type Data = {
    serviceStatus: ServiceStatus[]
    error: string | null
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const serviceStatus = await prisma.serviceStatus.findMany({
        take: 7,
        orderBy: {
            updatedAt: 'asc'
        }
    })
    res.status(200).json({serviceStatus, error: null})
}