import express from 'express'
import type { Request, Response } from 'express'

const app = express()
const port = 3001

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})