import { Product } from "../Models/Product";
import express from "express";
import { ProductForm } from "../FormValidators/ProductForm";
import { validationResult } from "express-validator";

const router = express.Router()

router.post("/products", ProductForm ,async (
    req:express.Request, 
    res:express.Response
) => {

    const formErrors = validationResult(req)

    if (!formErrors.isEmpty()) {
        res.json({
            status : 400,
            message : "Informations are not good",
            errors : formErrors
        })
    } else {

        const productData = req.body
        let product = new Product()
        product = productData

        const result = await Product.save(product)

        res.json({
            status : 200,
            response : result
        })

    }

})

router.get("/products", async (req, res) => {

    const products = await Product.find()

    if (products) {

        res.json({
            status : 200,
            products : products
        })

    } else {

        res.json({
            status : 200,
            products : "You don't have any product"
        })

    }

})

router.delete("/products/:id", async (req,res) => {

    const productDeleted = await Product.findOne(req.params.id)
    
    if (productDeleted) {

        const deleteAction = await Product.delete(req.params.id)

        res.json({
            status : 200,
            product : productDeleted,
            message: "Succesfully deleted"
        })

    } else {

        res.json({
            status : 400,
            errorMessage : "Your product does not exist"
        })

    }

})

router.put("/products/:id", async (req,res) => {

    const productId = req.params.id
    const productUpdated = req.body

    const product = await Product.findOne(productId)

    if (product) {
        
        const updateAction = await Product.update(productId, productUpdated)
        const productChanged = await Product.findOne(productId)

        res.json({
            status : 200,
            message : "Product updated",
            response : updateAction,
            product : productChanged
        })

    } else {

        res.json({
            status : 400,
            message : "Your product does not exist",
        })

    }

}) 

export default router