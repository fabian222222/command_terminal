import { Terminal } from "../Models/Terminal";
import express from "express";
import { validationResult } from "express-validator";
import uuid4 from "uuid4";
import {TerminalForm} from './../FormValidators/Terminal/TerminalForm'
import { Company } from "../Models/Company";

const router = express.Router()

router.post("/terminals", TerminalForm ,async(req, res) => {

    const formErrors = validationResult(req)

    if (!formErrors.isEmpty()) {

        res.json({
            status : 400,
            message : "Informations are not good",
            errors : formErrors
        })

    } else {

        const terminal = new Terminal()
        terminal.number = uuid4()
        terminal.createdAt = new Date()
        terminal.active = false
        terminal.compagny = req.body.compagny
        terminal.name = req.body.name

        const result = await Terminal.save(terminal)

        res.json({
            status : 200,
            message : "Terminal created",
            terminal : result
        })

    }

})

router.get("terminals", async(
    req:express.Request,
    res:express.Response
) => {

    const terminals = await Terminal.find() 

    res.json({
        status : 200,
        terminals : terminals
    })

})

router.get("/terminals/:id", async (req,res) => {

    const terminalId = req.params.id
    const terminal = await Terminal.findOne(terminalId)

    if (terminal) {

        res.json({
            status: 200,
            result : terminal
        })

    } else {

        res.json({
            status : 400,
            message : "terminal does not exist"
        })

    }

})

router.put("/terminals/:id", async (req, res) => {

    const terminalId = req.params.id
    const terminal = await Terminal.findOne(terminalId)

    const formErrors = validationResult(req)

    if (!formErrors.isEmpty() || !terminal) {

        res.json({
            status : 400,
            message : "Terminal does not exist or invalid informations",
            errors:formErrors
        })

    } else {

        const datasUpdate = req.body 

        const terminalUpdate = await Terminal.findOne(terminalId)

        terminalUpdate.active = datasUpdate.active
        terminalUpdate.compagny = datasUpdate.compagny
        terminalUpdate.name = datasUpdate.name
        
        const updateAction = await Terminal.update(terminalId, terminalUpdate)

        const updated = await Terminal.findOne(terminalId)

        res.json({
            status : 200,
            result : updateAction,
            changed : updated
        })

    }

})

router.delete("/terminals/:id", async (req, res) => {

    const terminalId = req.params.id
    const terminalToDelete = await Terminal.findOne(terminalId)

    if (terminalToDelete) {
        const deleteAction = await Terminal.delete(terminalId)

        res.json({
            status : 200,
            response : deleteAction,
            terminal : terminalToDelete
        })
    } else {

        res.json({
            status : 400,
            message : "This terminal does not exist"
        })

    }

})
export default router