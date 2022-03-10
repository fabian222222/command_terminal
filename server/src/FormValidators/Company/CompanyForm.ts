import { body } from "express-validator"

export const CompanyForm = [
    body("name")
        .isAlpha().withMessage("This field need to contain only caracters"),
    body("country")
        .isAlpha().withMessage("This field need to contain only caracters"),
    body("town")
        .isAlpha().withMessage("Town field need to contain only caracters")
]