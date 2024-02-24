const fs = require ('fs')

class ProductManager {
    constructor(path) {
        path = ('./ejemplo.json');
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
   
const product = new ProductManager();


const miProduct = [
    {
    title: "Pelota Nike Academy Team", 
    description: "Salí a divertirte en la cancha con la Pelota Nike Academy Team. Cuenta con ranuras específicamente diseñadas para proporcionar una rotación uniforme y precisa cuando está en el aire. Ahora ya no tendrás que preocuparte por el comportamiento impredecible del balón y podrás concentrarte completamente en tus jugadas. Esta pelota está diseñada para potenciar tu rendimiento en el campo, brindándote el control y la confianza necesaria para destacar en cada partido.", 
    price:  59.000, 
    thumbnail:  "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwf5ee086c/products/NICU8047-100/NICU8047-100-1.JPG", 
    code: "NIKETEAM", 
    stock: 1
    },

    {
        title: "Pelota adidas Afa22 Pro", 
        description: "Sentí la Copa Mundial más cerca con la Pelota adidas Afa22 Pro. Precisa, con una construcción termosellada sin costuras y cuenta con el sello FIFA Quality Pro que mejora los golpes y una textura que optimiza el efecto de giro y la precisión. Inspirada en la icónica pelota tango Rosario que vio coronar a Argentina como campeón del mundo en suelo local. Sentí la pasión por el futbol con los gráficos estampados difuminados y vibrantes que abren paso a un mundo de posibilidades para tu juego con amigos.", 
        price:  150.000, 
        thumbnail:  "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dw5e3765cf/products/AD_HE3788/AD_HE3788-1.JPG", 
        code: "ADIDDASAFA", 
        stock: 2
    },
    {
        title: "Pelota Fútbol adidas Argentina 23 Pro N5",
        description:  "La Pelota Fútbol adidas Argentina 23 Pro N5 es todo lo que cualquier apasionado quisiera tener para disfrutar de sus partidos con amigos o familia en casa. Con un diseño que elogia la liga argentina y te invade de orgullo. Su fabricación en cuero sintético premium, cámara de caucho y construcción en paneles termosellados hacen de este accesorio algo muy duradero que está a la altura de cada ocasión. El sello FIFA Quality Pro se une al escudo de la Selección Argentina decidiéndote por esta pelota única que vas a amar tener.", 
        price:  160.000, 
        thumbnail:  "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwfc049e85/products/ADIA0995/ADIA0995-1.JPG", 
        code: "ADIDDASARG", 
        stock: 3
    },
    {
        title: "Pelota Fútbol adidas Argentina 23 Pro N5",
        description:  "Mirá cómo se alinearán las estrellas en Estambul en 2023. La Pelota adidas Ucl Istanbul N5 de entrenamiento UCL es perfecta para practicar tus habilidades. Está cosida a máquina para una mayor resistencia al desgaste y un toque suave. Su intrincado diseño se inspira en la pelota oficial usada en las eliminatorias de la UEFA Champions League.", 
        price:  60.000, 
        thumbnail:  "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dw447393ca/products/ADHU1578/ADHU1578-1.JPG", 
        code: "ADIDDASUCL", 
        stock: 4
    },
    {
        title: "Pelota Nike Academy Team",
        description: "La Pelota Fútbol Adidas Argentina 22 Com Unisex es la elección perfecta para los fanáticos de este deporte. Con un diseño icónico inspirado en la selección argentina, esta pelota te ofrece un rendimiento excepcional en el campo. Su construcción duradera y resistente al desgaste garantiza una gran durabilidad, mientras que su diseño de paneles cosidos a máquina proporciona un vuelo preciso y una sensación suave al golpearla. Dominá el juego con tu talento y esta pelota.", 
        price:  94.999, 
        thumbnail: "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwf29bf534/products/ADHE3787/ADHE3787-1.JPG", 
        code: "ADIDDASFC", 
        stock: 5
    }
]

product.addProduct(miProduct);
product.getProductById(1);
console.log(product);





