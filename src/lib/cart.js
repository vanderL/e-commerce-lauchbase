const { formatPrice } = require('./utils')

const Cart = {
    init(oldCart) {
        if(oldCart){
            this.items = oldCart.items
            this.total = oldCart.total
        } else {
            this.items = []
            this.total = {
                quantity: 0,
                price: 0,
                formattedPrice: formattedPrice(0)
            }
        }

        return this
    },
    addOne(product){},
    removeOne(productId){},
    delete(productId){}
}
console.log(Cart.init({items: [1, 2, 3], total: { quantity: 50 }}))

module.exports = Cart