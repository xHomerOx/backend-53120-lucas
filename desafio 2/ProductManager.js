const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path || './ejemplo.json';
        this.products = [];
        this.productIdCount = 1;

        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
        }

        setTimeout(() => {
            this.deleteFile();
        }, 6000);
    }

    findProductById(id) {
        const fileProducts = this.getProducts();
        const productIndex = fileProducts.findIndex(product => product.id === id);
        return { fileProducts, productIndex };
    }

    getProducts() {
        try {
            const data = JSON.parse(fs.readFileSync(this.path));
            return data;
        } catch (error) {
            throw error;
        }
    }

    addProduct(productObj) {
        const requiredFields = ["title", "description", "price", "thumbnail", "code", "stock"];
        for (const field of requiredFields) {
            if (!productObj[field]) {
                return `Error: field ${field} is missing on the object.`;
            }
        }
        let { fileProducts } = this.findProductById(productObj.id); 
        const newProduct = {
            id: this.productIdCount++,
            ...productObj
        };
        fileProducts.push(newProduct);
        this.saveProductsToFile(fileProducts);
        return "product added.";
    }

    getProductById(id) {
        const { fileProducts, productIndex } = this.findProductById(id); 
        if (productIndex !== -1) {
            return fileProducts[productIndex];
        } else {
            return " Error: That product doesn't exist."
        }
    }

    updateProduct(id, productData) {
        const { fileProducts, productIndex } = this.findProductById(id); 
        if (productIndex !== -1) {
            for (const field in productData) {
                if (field !== "id" && productData.hasOwnProperty(field)) {
                    fileProducts[productIndex][field] = productData[field];
                }
            }
            this.saveProductsToFile(fileProducts);
            return "product updated.";
        } else {
            return `Error: Product with id ${id} not found.`;
        }
    }

    deleteProduct(id) {
        const { fileProducts, productIndex } = this.findProductById(id);
        if (productIndex !== -1) {
            fileProducts.splice(productIndex, 1);
            this.saveProductsToFile(fileProducts);
            return "Product Deleted";
        } else {
            return `Error: Product with id ${id} not found.`;
        }
    }

    saveProductsToFile(productData) {
        const data = JSON.stringify(productData, null, 2);
        fs.writeFileSync(this.path, data);
    }

    deleteFile() {
        fs.unlinkSync(this.path);
        console.log(`El archivo ${this.path} ha sido eliminado.`);
    }
}

const product = new ProductManager();

const miProduct = [
    {
        title: "Pelota Nike Academy Team",
        description: "Salí a divertirte en la cancha con la Pelota Nike Academy Team. Cuenta con ranuras específicamente diseñadas para proporcionar una rotación uniforme y precisa cuando está en el aire. Ahora ya no tendrás que preocuparte por el comportamiento impredecible del balón y podrás concentrarte completamente en tus jugadas. Esta pelota está diseñada para potenciar tu rendimiento en el campo, brindándote el control y la confianza necesaria para destacar en cada partido.",
        price: 59.000,
        thumbnail: "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwf5ee086c/products/NICU8047-100/NICU8047-100-1.JPG",
        code: "NIKETEAM",
        stock: 1
    },

];

for (const productObj of miProduct) {
    product.addProduct(productObj);
}

console.log(product);
product.getProductById(1);
console.log(product);
