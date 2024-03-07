import express from 'express';
import ProductManager from './productManager.js';
import CartManager from './cartManager.js';



const app = express();
const PORT = 8080;

const productManager = new ProductManager(); 
const cartManager = new CartManager(); 

const productsRouter = express.Router();
const cartsRouter = express.Router();

// Routes for products
productsRouter.get('/products', async (req, res) => {
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
        const { title, description, code, price, stock, category, thumbnails } = req.body;
        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error("Todos los campos son obligatorios.");
        }
        const newProduct = await productManager.addProduct({
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category,
            thumbnails: thumbnails || []
        });
        res.json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Routes for carts
cartsRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid); 
        const cartProducts = await cartManager.getCartProducts(cartId); 
        res.json(cartProducts); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartManager.addProductToCart(cid, pid);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.use(express.json());
app.use(express.static("./public"));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
