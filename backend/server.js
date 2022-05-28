import productRouter from './routers/productRouter.js';

app.use('/api/products', productRouter);
import dotenv from 'dotenv';
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
