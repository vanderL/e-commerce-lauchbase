const faker = require('faker')
const  { hash } = require('bcryptjs')

const User = require('./src/app/models/User')

let usersIds = []

async function createUsers() {
    const users = []
    const password = await hash('1111', 8)
    let totalUsers = 3

    while (users.length < totalUsers) {
        users.push({
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password,
            cpf_cnpj: faker.random.number(99999999),
            cep: faker.random.number(9999999999),
            address: faker.address.streetName(),
        })
    }

    const usersPromise = users.map(user => User.create(user))

    usersIds = await Promise.all(usersPromise)
}

createUsers()