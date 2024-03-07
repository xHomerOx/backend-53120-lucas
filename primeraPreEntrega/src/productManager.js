import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path || './productos.json';
        this.products = [];

        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
        } else {
            this.loadProductsFromFile();
        }
    }

    async getProducts(limit) {
        try {
            let productos = [...this.products];
            if (limit) {
                productos = productos.slice(0, limit);
            }
            return productos;
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
                return `Producto con ID ${id} no encontrado`;
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

    async addProduct(productData) {
        try {
            const { id } = productData;
            const existingProduct = this.products.find(product => product.id === id);
            if (existingProduct) {
                existingProduct.quantity = (existingProduct.quantity || 1) + 1;
            } else {
                this.products.push({ ...productData, quantity: 1 });
            }
            await this.saveProductsToFile();
            return existingProduct || productData;
        } catch (error) {
            throw error;
        }
    }

    async updateProductById(id, newData) {
        try {
            const index = this.products.findIndex(product => product.id === id);
            if (index !== -1) {
                this.products[index] = { ...this.products[index], ...newData };
                await this.saveProductsToFile();
                return this.products[index];
            } else {
                throw new Error(`Producto con ID ${id} no encontrado`);
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteProductById(id) {
        try {
            const index = this.products.findIndex(product => product.id === id);
            if (index !== -1) {
                this.products.splice(index, 1);
                await this.saveProductsToFile();
                return `Producto con ID ${id} eliminado exitosamente`;
            } else {
                throw new Error(`Producto con ID ${id} no encontrado`);
            }
        } catch (error) {
            throw error;
        }
    }

    generateUniqueId() {
        const ids = this.products.map(product => product.id);
        const maxId = ids.length > 0 ? Math.max(...ids) : 0;
        return maxId + 1;
    }
}

export default ProductManager;
