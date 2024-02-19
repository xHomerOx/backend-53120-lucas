class ProductManager {
    constructor() {
        this.products = [];
        this.productIdCount = 1;
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.warn("todos los campos son obligatorios")
            return;
        }

        const codeExists = this.products.some(product => product.code === code);
        if (codeExists) {
            console.log("codigo ya introducido. Elija otro");
            return;
        }

        const newProduct = {
            id: this.productIdCount++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct)
        console.log("producto agregado:", newProduct);
    }

    getProducts() {
        return this.products;
    }
    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        }
        else{
            console.error("producto no encontrado");
            return null;
        }
    }
}
const productManager = new ProductManager();

productManager.addProduct("Pelota Nike Academy Team", "Salí a divertirte en la cancha con la Pelota Nike Academy Team. Cuenta con ranuras específicamente diseñadas para proporcionar una rotación uniforme y precisa cuando está en el aire. Ahora ya no tendrás que preocuparte por el comportamiento impredecible del balón y podrás concentrarte completamente en tus jugadas. Esta pelota está diseñada para potenciar tu rendimiento en el campo, brindándote el control y la confianza necesaria para destacar en cada partido.", 59.000, "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwf5ee086c/products/NICU8047-100/NICU8047-100-1.JPG","NIKETEAM", 1)
productManager.addProduct("Pelota adidas Afa22 Pro","Sentí la Copa Mundial más cerca con la Pelota adidas Afa22 Pro. Precisa, con una construcción termosellada sin costuras y cuenta con el sello FIFA Quality Pro que mejora los golpes y una textura que optimiza el efecto de giro y la precisión. Inspirada en la icónica pelota tango Rosario que vio coronar a Argentina como campeón del mundo en suelo local. Sentí la pasión por el futbol con los gráficos estampados difuminados y vibrantes que abren paso a un mundo de posibilidades para tu juego con amigos." , 150.000 , "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dw5e3765cf/products/AD_HE3788/AD_HE3788-1.JPG","ADIDDASAFA", 2)
productManager.addProduct("Pelota Fútbol adidas Argentina 23 Pro N5", "La Pelota Fútbol adidas Argentina 23 Pro N5 es todo lo que cualquier apasionado quisiera tener para disfrutar de sus partidos con amigos o familia en casa. Con un diseño que elogia la liga argentina y te invade de orgullo. Su fabricación en cuero sintético premium, cámara de caucho y construcción en paneles termosellados hacen de este accesorio algo muy duradero que está a la altura de cada ocasión. El sello FIFA Quality Pro se une al escudo de la Selección Argentina decidiéndote por esta pelota única que vas a amar tener.",160.000,"https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwfc049e85/products/ADIA0995/ADIA0995-1.JPG","ADIDDASARG", 3)
productManager.addProduct("Pelota adidas UCL Istanbul N5","Mirá cómo se alinearán las estrellas en Estambul en 2023. La Pelota adidas Ucl Istanbul N5 de entrenamiento UCL es perfecta para practicar tus habilidades. Está cosida a máquina para una mayor resistencia al desgaste y un toque suave. Su intrincado diseño se inspira en la pelota oficial usada en las eliminatorias de la UEFA Champions League.",60.000,"https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dw447393ca/products/ADHU1578/ADHU1578-1.JPG","ADIDDASUCL", 4)
productManager.addProduct("Pelota Fútbol adidas Argentina 22 Com Unisex", "La Pelota Fútbol Adidas Argentina 22 Com Unisex es la elección perfecta para los fanáticos de este deporte. Con un diseño icónico inspirado en la selección argentina, esta pelota te ofrece un rendimiento excepcional en el campo. Su construcción duradera y resistente al desgaste garantiza una gran durabilidad, mientras que su diseño de paneles cosidos a máquina proporciona un vuelo preciso y una sensación suave al golpearla. Dominá el juego con tu talento y esta pelota.",94.999,"https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwf29bf534/products/ADHE3787/ADHE3787-1.JPG","ADIDDASFC",5)

const allProducts = productManager.getProducts();
console.log ("todos los productos", allProducts);

const productById = productManager.getProductById(1);
console.log( "producto por ID", productById);
const nonExistentProduct = productManager.getProductById(3);

