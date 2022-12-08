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
  console.log('success new ChatGPTAPI')

  await api.ensureAuth()
  console.log('success ensureAuth')

  // 获取 post 或 get 请求的参数
  const { msg } = req.body || req.query
  console.log('success', msg)

  // send a message and wait for the response
  const response = await api.sendMessage(msg, {
    timeoutMs: 30 * 1000
  })
  console.log('success sendMessage')

  res.status(200).json({ answer: response })
}
