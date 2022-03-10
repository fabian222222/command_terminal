import { Company } from "../Models/Company";
import express from "express";
import { validationResult } from "express-validator";
import { CompanyForm } from "../FormValidators/Company/companyForm";
import { CompanyUpdateForm } from "../FormValidators/Company/CompanyUpdateForm";

const router = express.Router()

router.post("/companies", CompanyForm ,async(
    req:express.Request,
    res:express.Response
) => {

    const companyFormErrors = validationResult(req)

    if (!companyFormErrors.isEmpty()) {
        res.json({
            status : 400,
            message : "Data are not correct",
            details : companyFormErrors
        })
    } else {

        const company = new Company()
        const companyData = req.body

        company.name = companyData.name
        company.country = companyData.country
        company.town = companyData.town
        company.createdAt = new Date()

        const createCompany = await Company.save(company)

        res.json({
            status : 200,
            company : createCompany
        })

    }

})

router.get("/companies/:id", async (
    req:express.Request,
    res:express.Response
) => {

    const companyId = parseInt(req.params.id)

    if (companyId) {

        const company = await Company.findOne(companyId)

        if (company) {

            res.json({
                status : 200,
                company : company
            })

        } else {

            res.json({
                status : 400, 
                message:  "This company does not exist"
            })

        }

    } else {

        res.json({
            status : 400,
            message: "The id given is not of type integer"
        })

    }

})

router.put("/companies/:id", CompanyUpdateForm, async(
    req:express.Request,
    res:express.Response
) => {

    const companyId = parseInt(req.params.id)

    if (companyId) {

        const changes = req.body
        const company = await Company.findOne(companyId)

        if (company) {

            const [companyUpdate, companyAfterUpdate] = await Promise.all([
                Company.update(companyId, changes), Company.findOne(companyId)
            ])

            res.json({
                status : 200,
                company : companyAfterUpdate
            })

        } else {

            res.json({
                status : 400,
                message : "The company asked does not exist"
            })

        }

    } else {
        
        res.json({
            status : 400,
            message : "The id given is not of type integer"
        })

    }

})

router.delete("/companies/:id", async(
    req:express.Request,
    res:express.Response
) => {

    const companyId = parseInt(req.params.id)

    if (companyId) {

        const company = await Company.findOne(companyId)

        if (company) {

            await Company.delete(companyId)

            res.json({
                status : 200,
                message : "Comany deleted with success",
                company : company
            })

        } else {

            res.json({
                status : 400,
                message : "The company does not exist"
            })

        }

    } else {

        res.json({
            status : 400,
            message : "The id given is not of type integer"
        })

    }

})

export default router