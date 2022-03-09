import { body } from "express-validator"

export const IngredientForm = [
    body("name")
        .isAlpha().withMessage("This field need to contain only caracters"),
    body("price")
        .isNumeric(),
    body("quantity")
        .isNumeric()
]