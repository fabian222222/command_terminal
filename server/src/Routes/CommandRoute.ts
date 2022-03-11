import { Command } from "../Models/Command";
import express from "express"
import { validationResult } from "express-validator";
import { CommandForm } from "../FormValidators/Command/CommandForm";
import { CommandUpdateForm } from "../FormValidators/Command/CommandUpdateForm";

const router = express.Router()

router.get("/commands/:id", CommandForm, async(
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