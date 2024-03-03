import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path || './products.json';
        this.products = [];

        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
        }
    }

    async getProducts(limit) {
        try {
            let products = await fs.promises.readFile(this.path, 'utf8');
            products = JSON.parse(products);

            if (limit) {
                products = products.slice(0, limit);
            }

            return products;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(id) {
        try {
            let products = await fs.promises.readFile(this.path, 'utf8');
            products = JSON.parse(products);

            const product = products.find(product => product.id === id);

            if (product) {
                return product;
            } else {
                return `Product with ID ${id} Not Found`;
            }
        } catch (error) {
            throw error;
        }
    }
}

export default ProductManager;
