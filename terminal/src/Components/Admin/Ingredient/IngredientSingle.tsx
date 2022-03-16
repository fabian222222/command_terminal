import { deleteIngredient } from "../../../Services/IngredientApi"

const IngredientSingle = (props:{
    id:number,
    name:string,
    price:number,
    quantity:number
}) => {

    const deleteIngredientAction = async (id:number) => {
        await deleteIngredient(id)
    }

    return (
        <div>
            <p>{props.name}</p>
            <p>{props.price}</p>
            <p>{props.quantity}</p>
            <button onClick={()=>{
                deleteIngredientAction(props.id)
            }}>Delete this ingredient</button>
        </div>
    )
}

export default IngredientSingle