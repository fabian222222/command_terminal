import { body } from "express-validator"

export const CommandForm = [
    body("userId").optional()
        .isNumeric().withMessage("UserID need to be of type integer"),
    body("products")
        .isArray().withMessage("Products need to be an array of product")
]