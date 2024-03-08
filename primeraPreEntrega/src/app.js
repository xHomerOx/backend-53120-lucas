// Importar los módulos necesarios
import express from 'express';
import ProductManager from './productManager.js';
import CartManager from './cartManager.js';
import productsRouter from '../src/routes/products.js';
import cartsRouter from '../src/routes/carts.js';


const app = express();
const productManager = new ProductManager();
const cartManager = new CartManager();


const PORT = 8080;


app.use(express.json());


app.use('/api/products', productsRouter);


app.use('/api/carts', cartsRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
