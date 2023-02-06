import { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line import/no-unresolved
import prisma from '@/lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { id } = req.query
  console.log('id', id)
  switch (method) {
    case 'GET':
      try {
        const lists = await prisma.list.findMany({
          where: {
            userId: String(id),
          },
        })
        res.status(200).json(lists)
      } catch (error) {
        res.status(500).json({ error })
      }
      break
    case 'DELETE':
      try {
        const list = await prisma.list.delete({
          where: {
            id: String(id),
          },
        })
        res.status(200).json(list)
      } catch (error) {
        res.status(500).json({ error })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
