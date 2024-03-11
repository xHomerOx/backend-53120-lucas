import fs from 'fs';

class CartManager {
    constructor(path) {
        this.path = path || './Data/carts.json';
        this.carts = [];

        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify(this.carts, null, "\t"));
        } else {
            this.loadCartsFromFile();
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
            const cart = await this.getCartById(cartId);
            if (!cart) {
                throw new Error('Cart not found');
            }

            const existingProductIndex = cart.products.findIndex(product => product.id === productId);
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity++;
            } else {
                cart.products.push({ id: productId, quantity: 1 });
            }

            await this.updateCart(cartId, cart);
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async getProductsInCart(cartId) {
        try {
            const cart = await this.getCartById(cartId);
            if (!cart) {
                throw new Error('Cart not found');
            }
            return cart.products;
        } catch (error) {
            throw error;
        }
    }

    async getCartById(cartId) {
        try {
            return this.carts.find(cart => cart.id === cartId);
        } catch (error) {
            throw error;
        }
    }

    async updateCart(cartId, newData) {
        try {
            const index = this.carts.findIndex(cart => cart.id === cartId);
            if (index !== -1) {
                this.carts[index] = { ...this.carts[index], ...newData };
                await this.saveCartsToFile();
                return this.carts[index];
            } else {
                throw new Error(`Cart with ID ${cartId} not found`);
            }
        } catch (error) {
            throw error;
        }
    }
}

export default CartManager;
