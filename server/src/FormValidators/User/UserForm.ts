import { body } from "express-validator"

export const UserForm = [
    body("firstname")
        .isAlpha().withMessage("This field need to contain only caracters"),
    body("lastname")
        .isAlpha().withMessage("This field need to contain only caracters"),
    body("mail")
        .isEmail().withMessage("Email not correct"),
    body("password")
        .isLength({min:8}),
    body("compagnyId")
        .isNumeric()
]