import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8080;

app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use(express.static(join(__dirname, '../public')));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
