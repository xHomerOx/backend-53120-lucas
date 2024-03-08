import express from 'express';
import ProductManager from '../productManager.js';

const productManager = new ProductManager();
const productsRouter = express.Router();


productsRouter.get('/', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : null;
        const products = await productManager.getProducts(limit); 
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


productsRouter.get('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid); 
        const product = await productManager.getProductById(productId); 
        res.json(product); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


productsRouter.post('/', async (req, res) => {
    try {
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default productsRouter;
