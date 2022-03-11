import { body } from "express-validator"

export const CommandUpdateForm = [
    body("status").optional()
        .isAlpha().withMessage("This field need to contain only caracters")
]