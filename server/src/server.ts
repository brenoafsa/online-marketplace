import express from 'express'
import type { Request, Response } from 'express'
import cors from 'cors';

const app = express()
const port = 3001
app.use(cors({ origin: `http://localhost:3000`, credentials: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})