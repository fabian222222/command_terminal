import { User } from "../Models/User";
import { Command } from "../Models/Command";
import express from "express"
import { validationResult } from "express-validator";
import { CommandForm } from "../FormValidators/Command/CommandForm";
import { CommandUpdateForm } from "../FormValidators/Command/CommandUpdateForm";
import { Product } from "../Models/Product";
import { CommandHasProduct } from "../Models/CommandHasProduct";

const router = express.Router()

router.post("/commands", CommandForm, async(
    req:express.Request,
    res:express.Response
) => {

    const commandFormErrors = validationResult(req)

    if (!commandFormErrors.isEmpty()){

        res.json({
            status : 400,
            message : "Data given are not good",
            details : commandFormErrors
        })

    } else {

        const commandData = req.body
        const products = commandData.products

        const command = new Command()
        command.custom = commandData.custom
        if (commandData.userId) {
            const user = await User.findOne(commandData.userId)
            command.user = user
        }
        const amountEachProduct = products.map((product:any) => {
            return product.price * product.quantity
        })
        const amountCommand = amountEachProduct.reduce((previousValue, currentValue) => {
            return previousValue + currentValue
        })
        command.status = commandData.status
        command.amount = amountCommand

        const createCommand = await Command.save(command)

        products.map( async (product:any) => {

            const productChecker = await Product.findOne(product.id)
            if (productChecker) {
                for(let i = 1; i <= product.quantity; i++){
                    const addProductToCommand = new CommandHasProduct()
                    addProductToCommand.command = createCommand
                    addProductToCommand.product = productChecker
    
                    await CommandHasProduct.save(addProductToCommand)
                }
            }

        })

        res.json({
            status : 200,
            command : createCommand
        })

    }

})

router.get("/commands/:id", async(
    req:express.Request,
    res:express.Response
) => {

    const commandId = parseInt(req.params.id)

    if (commandId){

        const command = await Command.findOne(commandId)

        if (command) {

            res.json({
                status : 200,
                command : command
            })

        } else {

            res.json({
                status : 400,
                message : "This command does not exist"
            })

        }

    } else {

        res.json({
            status : 400,
            message : "The id given is not of type integer"
        })

    }

})

router.put("/commands/:id", async(
    req:express.Request,
    res:express.Response
) =>{

    const commandId = parseInt(req.params.id)

    if (commandId) {

        const command = await Command.findOne(commandId)

        if (command) {

            const changes = req.body

            await Command.update(commandId, changes)
            const commandAfterUpdate = await Command.findOne(commandId)

            res.json({
                status : 200,
                command : commandAfterUpdate
            })

        } else {

            res.json({
                status : 400,
                message : "This command does not exist"
            })

        }

    } else {

        res.json({
            status : 400,
            message : "The Id given is not of type integer"
        })

    }

})

router.delete("/commands/:id", async(
    req:express.Request,
    res:express.Response
) => {

    const commandId = parseInt(req.params.id)

    if (commandId) {

        const command = await Command.findOne(commandId)

        if (command) {

            await Command.delete(commandId)
            
            res.json({
                status : 200,
                message : "Command delete success",
                command : command
            })

        } else {

            res.json({
                status : 400,
                message : "This command does not exist"
            })
        
        }

    } else {

        res.json({
            status : 400,
            message : "The Id given is not of type integer"
        })
    
    }

})

export default router