import { body } from "express-validator"

export const CommandForm = [
    body("status")
        .isAlpha().withMessage("This field need to contain only caracters"),
    body("amount")
        .isNumeric().withMessage("This field need to contain only numbers"),
    body("userId").optional()
        .isNumeric().withMessage("UserID need to be of type integer")
]