import express from 'express'
import type { Request, Response } from 'express'
import cors from 'cors';
import { router } from '@infrastructure/http/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express()
const port = 3001

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Online Marketplace API',
      version: '1.0.0',
      description: 'API documentation for Online Marketplace',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./src/infrastructure/http/doc/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors({ origin: `http://localhost:3000`, credentials: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
})

app.use('/api', router);

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})