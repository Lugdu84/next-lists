import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const lists = await prisma.list.findMany()
        res.status(200).json(lists)
      } catch (error) {
        res.status(500).json({ error: error.message })
      }
      break
    case 'POST':
      try {
        const list = await prisma.list.create({
          data: {
            title: req.body,
          },
        })
        res.status(201).json(list)
      } catch (error) {
        res.status(500).json({ error: error.message })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
