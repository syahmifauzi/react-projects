import type { NextApiRequest, NextApiResponse } from 'next'

import { deleteDua } from '@libs/GSheet'

type Data = {
  error?: string
  success?: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === 'POST') {
      const { title, message } = req.body
      const isDeleted = await deleteDua(title, message)
      if (isDeleted) {
        res.status(200).json({ success: true })
      } else {
        res.status(500).json({ error: 'Doa tidak berjaya dibuang' })
      }
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
