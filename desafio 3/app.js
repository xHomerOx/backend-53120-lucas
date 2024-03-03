const express = require('express');
const ProductManager = require('./productManager');

const app = express();
const PORT = 8080;

const productManager = new ProductManager(); 

async function myGreetings() {
    return 'Ir a "/products" para ver el listado'
}


app.get('/', async (req, res) => {
    let greetings = await myGreetings();
    res.send(greetings);
})

app.get('/products', async (req, res) => {
    try {
        const products = productManager.getProducts(); 
        const limit = req.query.limit; 
        if (limit) {
            res.json(products.slice(0, parseInt(limit))); 
        } else {
            res.json(products);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid); 
        const product = productManager.getProductById(productId); 
        res.json(product); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
