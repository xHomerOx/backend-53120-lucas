// cartManager.js
import fs from 'fs';

class CartManager {
    constructor(path) {
        this.path = path || './carts.json';
        this.carts = [];

        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify(this.carts, null, "\t"));
        } else {
            this.loadCartsFromFile();
        }
    }

    async getCarts() {
        try {
            return this.carts;
        } catch (error) {
            throw error;
        }
    }

    async getCartById(id) {
        try {
            const cart = this.carts.find(cart => cart.id === id);
            if (cart) {
                return cart;
            } else {
                return `Cart with ID ${id} Not Found`;
            }
        } catch (error) {
            throw error;
        }
    }

    async saveCartsToFile() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, "\t"));
        } catch (error) {
            throw error;
        }
    }

    async loadCartsFromFile() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8');
            this.carts = JSON.parse(data);
        } catch (error) {
            throw error;
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const cartIndex = this.carts.findIndex(cart => cart.id === cartId);
            if (cartIndex !== -1) {
                const productIndex = this.carts[cartIndex].products.findIndex(product => product.id === productId);
                if (productIndex !== -1) {
                    // Si el producto ya existe en el carrito, incrementar la cantidad
                    this.carts[cartIndex].products[productIndex].quantity += 1;
                } else {
                    // Si el producto no existe en el carrito, agregarlo
                    this.carts[cartIndex].products.push({ id: productId, quantity: 1 });
                }
                await this.saveCartsToFile();
                return this.carts[cartIndex];
            } else {
                throw new Error(`Cart with ID ${cartId} Not Found`);
            }
        } catch (error) {
            throw error;
        }
    }

    // Otros métodos como updateCartById y deleteCartById permanecen sin cambios



    async updateCartById(id, newData) {
        try {
            const index = this.carts.findIndex(cart => cart.id === id);
            if (index !== -1) {
                this.carts[index] = { ...this.carts[index], ...newData };
                await this.saveCartsToFile();
                return this.carts[index];
            } else {
                throw new Error(`Cart with ID ${id} Not Found`);
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteCartById(id) {
        try {
            const index = this.carts.findIndex(cart => cart.id === id);
            if (index !== -1) {
                this.carts.splice(index, 1);
                await this.saveCartsToFile();
                return `Cart with ID ${id} deleted successfully`;
            } else {
                throw new Error(`Cart with ID ${id} Not Found`);
            }
        } catch (error) {
            throw error;
        }
    }
}



export default CartManager;
