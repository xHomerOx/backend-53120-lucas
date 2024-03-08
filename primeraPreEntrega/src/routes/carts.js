

import express from 'express';
import CartManager from '../cartManager.js';

const cartsRouter = express.Router();
const cartManager = new CartManager();


cartsRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productsInCart = await cartManager.getProductsInCart(cartId);
        res.json(productsInCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const updatedCart = await cartManager.addProductToCart(cartId, productId);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default cartsRouter;
