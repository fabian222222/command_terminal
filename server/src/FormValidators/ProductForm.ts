import { body } from "express-validator"

export const ProductForm = [
    body("name")
        .isAlpha().withMessage("This field need to contain caracters only")
        .isLength({min:4}).withMessage("This field need to be longer than 4"),
    body("price")
        .isNumeric().withMessage("This field need to be a int"),
    body("custome")
        .isBoolean().withMessage("This field need to be a boolean")
]