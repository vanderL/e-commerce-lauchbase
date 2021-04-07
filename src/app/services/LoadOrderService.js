const Order = require('../models/Order')
const User = require('../models/User')
const LoadProductsService = require('./LoadProductsService')

const { formatPrice, date } = require('../../lib/utils')

async function format(order) {
    order.product = await LoadProductsService.load('product', {
        where: { id: order.product_id }
    })

    order.buyer = await User.findOne({
        where: { id: order.buyer_id }
    })

    order.seller = await User.findOne({
        where: { id: order.seller_id }
    })

    order.formattedPrice = formatPrice(order.price)
    order.formattedTotal = formatPrice(order.total)

    const statuses = {
        open: 'Aberto',
        sold: 'Vendido',
        canceled: 'Cancelado'
    }

    order.formattedStatus = statuses[order.status]

    const updateAt = date(order.updated_at)
    order.formattedUpdatedAt = `
        ${order.formattedStatus}
        em ${updateAt.day}/${updateAt.month}/${updateAt.year}
        ás ${updateAt.hour}h${updateAt.minutes}
    `

    return order
}

const LoadService = {
    load(service, filter) {
        this.filter = filter
        return this[service]()
    },
    async order() {
        try {
            const order = await Order.findOne(this.filter)
            return format(order)
        } catch (error) {
            console.error(error)
        }
    },
    async orders() {
        try {
            const orders = await Order.findAll(this.filter)
            const ordersPromise = orders.map(format)
            return Promise.all(ordersPromise)
        } catch (error) {
            console.error(error)
        }
    },
    format,
}

module.exports = LoadService 