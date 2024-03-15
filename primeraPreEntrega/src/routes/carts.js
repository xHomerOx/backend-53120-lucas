import { Router } from "express";
import { CartManager } from "../cartManager.js";
import { ProductManager } from "../productManager.js"; 

const cartsRouter = Router();
const carts = new CartManager("./Data/carts.json");
const products = new ProductManager("./Data/products.json");

// Controller de búsqueda por Id
cartsRouter.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await carts.getCartProducts(cid);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).send({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Controller para agregar un carrito
cartsRouter.post("/", async (req, res) => {
  try {
    const newCart = await carts.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Controller para agregar un producto en el carrito
cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const productDetails = await products.getProductById(pid);  
    if (!productDetails) {
      return res.status(400).send({ error: 'Producto no encontrado' });
    }
    const updateCart = await carts.addProductToCart(cid, pid); // Cambio en la llamada de función
    res.status(201).json(updateCart);
  } catch (error) {
    res.status(500).send({ status: 'Error', error: error.message });
  }
});

export default cartsRouter;
