import {createConnection} from "typeorm"
import express from 'express'
import * as bodyParser from 'body-parser'

// import all model that we need to create
import {User} from './Models/User'
import {Terminal} from './Models/Terminal'
import {Product} from './Models/Product'
import {Company} from './Models/Company'
import {Command} from './Models/Command'
import {Ingredient} from './Models/Ingredient'
import {ProductHasIngredient} from './Models/ProductHasIngredient'

// import all the route we are using
import ProductsRoute from './Routes/ProductsRoute'
import UsersRoute from './Routes/UsersRoute'
import TerminalsRoute from './Routes/TerminalsRoute'

// create the connection to the database
createConnection({
    type: "mysql",
    host: "localhost",
    port: 8889,
    username: "root",
    password: "root",
    database: "mcdo",
    entities: [
        User,
        Terminal, 
        Product,
        Company,
        Command,
        Ingredient,
        ProductHasIngredient
    ],
    synchronize: true,
    logging: false
})

// initialize express
const app = express()
app.use(bodyParser.json())

// add route to our app
app.use(ProductsRoute)
app.use(UsersRoute)
app.use(TerminalsRoute)

// initialize routes

app.listen(3000)