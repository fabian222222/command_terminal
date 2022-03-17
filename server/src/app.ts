import {createConnection} from "typeorm"
import express from 'express'
import * as bodyParser from 'body-parser'

import {User} from './Models/User'
import {Terminal} from './Models/Terminal'
import {Product} from './Models/Product'
import {Company} from './Models/Company'
import {Command} from './Models/Command'
import {Ingredient} from './Models/Ingredient'
import {ProductHasIngredient} from './Models/ProductHasIngredient'
import {CommandHasProduct} from './Models/CommandHasProduct'

import ProductsRoute from './Routes/ProductsRoute'
import UsersRoute from './Routes/UsersRoute'
import TerminalsRoute from './Routes/TerminalsRoute'
import IngredientRoute from './Routes/IngredientRoute'
import CompanyRoute from './Routes/CompanyRoute'
import CommandRoute from './Routes/CommandRoute'

import token from "./token"

import { Server } from 'socket.io'
import cors from 'cors'

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
        ProductHasIngredient,
        CommandHasProduct
    ],
    synchronize: true,
    logging: false
})

declare global {
    namespace Express{
        interface Request{
            user:User
        }
    }
}

const jwtExpress = require("express-jwt")
const app = express()
app.use(cors())
const http = require("http")
const server = http.createServer(app)
const io = new Server(server, {
    cors : {
        origin : "*",
        methods : ["GET", "POST", "DELETE", "PUT"]
    }
})

app.use(bodyParser.json())
app.use(jwtExpress({
    secret : token,
    algorithms : ["HS256"]
}).unless({
    path : ["/token", "/auth", "/users"]
}))

app.use( async (req,res,next) => {
    if (req.user){
        req.user = await User.findOne({
            where : {id : req.user.id}
        })
        next()
    } else {
        next()
    }
})

app.use(ProductsRoute)
app.use(UsersRoute)
app.use(TerminalsRoute)
app.use(IngredientRoute)
app.use(CompanyRoute)
app.use(CommandRoute)

io.on("connection", (socket) => {
    console.log(socket.id);
})

server.listen(8000)