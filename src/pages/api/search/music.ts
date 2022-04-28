import { AxiosError } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { connectSpotify } from '@/lib/spotify'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const { query } = req.query as {
    query: string
  }

  if (!query) {
    return res.status(400).json({ error: 'No query' })
  }

  try {
    const spotify = await connectSpotify(CLIENT_ID, CLIENT_SECRET)
    const data = await spotify.searchMusic(query)
    res.status(200).json(data)
  } catch (error) {
    const err = error as AxiosError
    res.status(500).json({ error: err.message })
  }
}
