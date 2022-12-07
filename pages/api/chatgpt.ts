// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ChatGPTAPI } from 'chatgpt'
import dotenv from 'dotenv-safe'
dotenv.config()

type Data = {
  answer: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // sessionToken is required; see below for details
  const api = new ChatGPTAPI({
    sessionToken: process.env.SESSION_TOKEN || ''
  })
  console.log('success')

  await api.ensureAuth()

  // send a message and wait for the response
  const response = await api.sendMessage('Write a python version of bubble sort.')

  res.status(200).json({ answer: response })
}
