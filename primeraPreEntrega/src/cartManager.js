

class CartManager {
    
    async addProductToCart(cartId, productId) {
        
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
    }
    
    
    async getProductsInCart(cartId) {
       
    }
}

export default CartManager;
