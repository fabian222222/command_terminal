import { body } from "express-validator"

export const TerminalForm = [
    body("name")
        .isAlpha().withMessage("This field need to contain only caracters"),
    body("compagny")
        .isNumeric()
]