import type { NextApiRequest, NextApiResponse } from 'next'

import Dua from '@models/Dua'
import { addNewDua } from '@libs/GSheet'

type Data = {
  error?: string
  doa?: Dua
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === 'POST') {
      const { title, malay, arabic, transliteration } = req.body
      const dua: Dua = {
        title,
        malay,
        arabic,
        transliteration,
        hidden: false
      }
      const createdDua = await addNewDua(dua)
      if (createdDua.error) {
        res.status(500).json({ error: createdDua.error })
      } else {
        res.status(200).json({ doa: createdDua })
      }
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
