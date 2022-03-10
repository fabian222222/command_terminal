import { body } from "express-validator"

export const CompanyUpdateForm = [
    body("name").optional()
        .isAlpha().withMessage("This field need to contain only caracters"),
    body("country").optional()
        .isAlpha().withMessage("This field need to contain only caracters"),
    body("town").optional()
        .isAlpha().withMessage("Town field need to contain only caracters")
]