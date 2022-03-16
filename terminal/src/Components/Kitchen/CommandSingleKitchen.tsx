import { Product } from "../../Interfaces/Product"
import { finishCommand } from "../../Services/CommandApi";

const CommandSingleKitchen = (props:{
    id:number
    amount:number,
    products:Product[]
}) => {

    const commandFinished = async (commandId:number) => {
        await finishCommand(commandId)
    }

    return (
        <div>
            <p>{props.amount}</p>
            {
                props.products.map((product:any,index) => {
                    return(
                        <div key={index}>
                            <p>{product.custom}</p>
                            <p>{product.name}</p>
                            <p>{product.price}</p>
                            {
                                product.product.productHasIngredient.map((ingredient:any, index:number) => {
                                    return(
                                        <div key={index}>
                                            <p>{ingredient.ingredient.name}</p>
                                            <p>{ingredient.ingredient.price}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
            <button onClick={() => {
                commandFinished(props.id)
            }}>This command is finished</button>
        </div>
    )
}

export default CommandSingleKitchen