const fs = require ('fs')

class ProductManager {
    constructor(path) {
        this.path = path;
        this.productIdCount = 1;

        if(!fs.existsSync(path)){
            fs.writeFileSync(path, "[]");
        }
    }

    getProducts(){
        try{
            const data = JSON.parse(fs.readFileSync(this.path));
            return data;
        }
        catch (error){
            throw error;
        }
    }
    addProduct(productObj) {
        const requiredFields = ["title", "description", "price", "thumbnail", "code", "stock"] 
        for(const field of requiredFields){
            if(!productObj[field]){
                return `Error: field ${field} is missing on the object.`;
            }     
        }
        let fileProducts = this.getProducts ();
        const newProduct = {
            id: this.productIdCount++,
            ...productObj
        };
        fileProducts.push(newProduct);
        this._saveProductsToFile(fileProducts);
        return "product added.";
        }
    
    getProductById(id) {
        let fileProducts = this.getProducts();
        const product = fileProducts.find(product => product.id === id);
        if (product) {
            return product;
        }
        else{
            return " Error: That product doesn't exist."
        }
    }
    updateProduct (id, productData){
        let fileProducts = this.getProducts();
        const  productIndex  = fileProducts.findIndex(product => product.id === id);
        if (productIndex === -1){
            return `Error: Product with id ${id} not found.`
        }

        for (const field in productData){
            if (field !== "id" && productData.hasOwnProperty(field)){
                fileProducts[productIndex][field] = productData [field];
            }
        }
        this._saveProductsToFile(fileProducts);
        return "product uptated."
    }
    deleteProduct (id){
         fileProducts = this.getProducts();
         const productIndex = fileProducts.findIndex(product =>product.id === id);
        if (productIndex === -1){
            return `Error: Product with id ${id} not found.`;
        }
        fileProducts.splice(productIndex,1);
        this._saveProductsToFile(fileProducts);
        return "Product Deleted"
        }
        _saveProductsToFile(productData){
            const data = JSON.stringify(productData,null, 2)
        fs.writeFileSync(this.path, data);
        }
}
module.exports = ProductManager;

