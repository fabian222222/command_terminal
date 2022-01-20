import {createConnection} from "typeorm";


// import all model that we need to create
import {User} from './Models/User'
import {Terminal} from './Models/Terminal'
import {Product} from './Models/Product'
import {Company} from './Models/Company'
import {Command} from './Models/Command'
import {Ingredient} from './Models/Ingredient'
import {ProductHasIngredient} from './Models/ProductHasIngredient'

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