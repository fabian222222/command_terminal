import { body } from "express-validator"

export const UserUpdateForm = [
    body("firstname").optional()
        .isAlpha().withMessage("This field need to contain only caracters"),
    body("lastname").optional()
        .isAlpha().withMessage("This field need to contain only caracters"),
    body("mail").optional()
        .isEmail().withMessage("Email not correct"),
    body("password").optional()
        .isLength({min:8}),
    body("compagnyId").optional()
        .isNumeric()
]