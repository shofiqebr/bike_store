import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import productRouter from './module/product/product.router';
const app: Application = express();
// const port = 3000;

// parser
app.use(express.json());
app.use(cors());

app.use(productRouter)

app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
});

export default app;
