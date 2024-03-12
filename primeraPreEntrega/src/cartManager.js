import fs from 'fs';

export class CartManager {
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
            let cart = await this.getCartById(cartId);
            if (!cart) {
                cart = { id: cartId, products: [] };
                this.carts.push(cart);
            }

            const existingProductIndex = cart.products.findIndex(product => product.id === productId);
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity++;
            } else {
                cart.products.push({ id: productId, quantity: 1 });
            }

            await this.saveCartsToFile();
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
}


