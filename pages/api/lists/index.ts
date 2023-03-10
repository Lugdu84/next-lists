import { NextApiRequest, NextApiResponse } from 'next'
// eslint-disable-next-line import/no-unresolved
import prisma from '@/lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  console.log('req body', req.body)
  const { title, userId } = req.body
  switch (method) {
    case 'GET':
      try {
        const lists = await prisma.list.findMany()
        res.status(200).json(lists)
      } catch (error) {
        res.status(500).json({ error })
      }
      break
    case 'POST':
      try {
        const list = await prisma.list.create({
          data: {
            title,
            userId,
          },
        })
        res.status(201).json(list)
      } catch (error) {
        res.status(500).json({ error })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
