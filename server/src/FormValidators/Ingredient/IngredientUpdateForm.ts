import { body } from "express-validator"

export const IngredientUpdateForm = [
    body("name").optional()
        .isAlpha().withMessage("This field need to contain only caracters"),
    body("price").optional()
        .isNumeric(),
    body("quantity").optional()
        .isNumeric()
]