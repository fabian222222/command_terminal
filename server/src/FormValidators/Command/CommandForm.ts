import { body } from "express-validator"

export const CommandForm = [
    body("status")
        .isAlpha().withMessage("This field need to contain only caracters"),
    body("userId").optional()
        .isNumeric().withMessage("UserID need to be of type integer"),
    body("custom")
        .isBoolean().withMessage("This field need to be a boolean"),
    body("products")
        .isArray().withMessage("Products need to be an array of product")
]