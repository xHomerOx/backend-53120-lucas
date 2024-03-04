import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path || './products.json';
        this.products = [];

        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
        } else {
            this.loadProductsFromFile(); // Cargar productos existentes al inicializar
        }
    }

    async getProducts(limit) {
        try {
            let products = [...this.products]; // Copiar array para evitar modificaciones inesperadas
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
            const product = this.products.find(product => product.id === id);
            if (product) {
                return product;
            } else {
                return `Product with ID ${id} Not Found`;
            }
        } catch (error) {
            throw error;
        }
    }

    async saveProductsToFile() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
        } catch (error) {
            throw error;
        }
    }

    async loadProductsFromFile() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            throw error;
        }
    }
}

export default ProductManager;
