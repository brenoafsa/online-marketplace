import express from 'express'
import type { Request, Response } from 'express'
import cors from 'cors';
import { productRouter } from './infrastructure/http/routes/product.routes';

const app = express()
const port = 3001

app.use(cors({ origin: `http://localhost:3000`, credentials: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
})

app.use('/api', productRouter);

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})