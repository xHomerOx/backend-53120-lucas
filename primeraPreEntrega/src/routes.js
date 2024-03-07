
import express from 'express';
import CartManager from './cartManager.js';
import { Router } from 'express';

const router = Router();
const cartManager = new CartManager();

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await cartManager.addProductToCart(cid, pid);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
