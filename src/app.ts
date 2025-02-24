import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import productRouter from './module/product/product.router';
import orderRouter from './module/order/order.router';
import authRouter from './module/auth/auth.router';
import cookieParser from "cookie-parser";
const app: Application = express();
// const port = 3000;

// parser
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true, // Allow credentials (cookies)
}));
app.use(express.urlencoded({ extended: true }));

app.use(productRouter);
app.use(orderRouter)
app.use(authRouter)

app.get('/', (req: Request, res: Response) => {
  // const a = 10;
  res.send("Hellow");
});

export default app;
