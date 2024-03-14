import express from 'express';
import ProductManager from './productManager.js';

const app = express();
const PORT = 8080;

const productManager = new ProductManager(); 

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : null;
        const products = await productManager.getProducts(limit); 
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid); 
        const product = await productManager.getProductById(productId); 
        res.json(product); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});