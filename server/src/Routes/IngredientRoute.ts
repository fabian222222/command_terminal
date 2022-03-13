import { Ingredient } from "../Models/Ingredient";
import express from "express";
import { validationResult } from "express-validator";
import { IngredientForm } from "../FormValidators/Ingredient/IngredientForm";
import { IngredientUpdateForm } from "../FormValidators/Ingredient/IngredientUpdateForm";

const router = express.Router()

router.post("/ingredients",IngredientForm, async (
    req:express.Request, 
    res:express.Response
) => {
    const ingredientFormErrors = validationResult(req)

    if (!ingredientFormErrors.isEmpty()) {
        res.json({
            status : 400,
            message : "Informations are not valid",
            errors : ingredientFormErrors
        })
    } else {

        const ingredient = new Ingredient()
        ingredient.name = req.body.name
        ingredient.price = req.body.price
        ingredient.quantity = req.body.quantity

        const createIngredient = await Ingredient.save(ingredient)

        res.json({
            status : 200,
            message : "Ingredient created",
            errors : createIngredient
        })
    }
})

router.get("/ingredients", async (
    req:express.Request,
    res:express.Response
) => {

    const ingredients = await Ingredient.find() 

    res.json({
        status : 200,
        ingredients : ingredients
    })

})

router.get("/ingredients/:id", async (
    req:express.Request,
    res:express.Response
) => {

    const ingredientId = parseInt(req.params.id)

    if (ingredientId) {
        const ingredient = await Ingredient.findOne(ingredientId)

        if (ingredient) {
            res.json({
                status: 200,
                response : ingredient
            })
        } else {
            res.json({
                status : 400,
                message: "This ingredient does not exist"
            })
        }
    } else {
        res.json({
            status : 400,
            message: "The id given is not integer"
        })
    }
})

router.delete("/ingredients/:id", async (
    req:express.Request,
    res:express.Response
) => {
    const ingredientId = parseInt(req.params.id)

    if (ingredientId) {

        const ingredient = await Ingredient.findOne(ingredientId)

        if (ingredient){
            await Ingredient.delete(ingredientId)

            res.json({
                status : 200,
                message : "ingredient deleted",
                ingredient : ingredient
            })
        } else {
            res.json({
                status : 400,
                message : "This ingredient does not exist"
            })
        }

    } else {
        res.json({
            status : 400,
            message: "The id given is not type int"
        })
    }
})  

router.put("/ingredients/:id", IngredientUpdateForm, async (
    req:express.Request,
    res:express.Response
) => {

    const ingredientId = parseInt(req.params.id)
    const ingredientFormErrors = validationResult(req)

    if (!ingredientFormErrors.isEmpty()){
        res.json({
            status : 400,
            message : "Data are not correct",
            details : ingredientFormErrors
        })
    } else {

        if (ingredientId) {

            const ingredient = await Ingredient.findOne(ingredientId)
            
            if (ingredient) {

                const changes = req.body
                
                await Ingredient.update(ingredientId, changes)
                const ingredientAfterUpdate = await Ingredient.findOne(ingredientId)

                res.json({
                    status : 200,
                    message : "Ingredient updated success",
                    ingredient : ingredientAfterUpdate
                })

            } else {
                res.json({
                    status : 400,
                    message : "This product does not exist"
                })
            }

        } else {
            res.json({
                status : 400, 
                message: "The id given is not of type integer"
            })
        }
    }

})

export default router