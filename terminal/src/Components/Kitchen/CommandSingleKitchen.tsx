import { Product } from "../../Interfaces/Product"
import { finishCommand } from "../../Services/CommandApi";
import {useState, useEffect} from "react"

const CommandSingleKitchen = (props:{
    id:number
    amount:number,
    date:Date,
    products:Product[]
}) => {

    const commandFinished = async (commandId:number) => {
        await finishCommand(commandId)
    }

    const [commandDuration, setCommandDuration] = useState()

    useEffect(() => {

        if (props.date) {
            const interval = setInterval(() => {
                const orderTimeCreated = props.date
                let timeElapsed = (new Date().getTime() - new Date(orderTimeCreated).getTime()) / 1000 / 60
                let minutes = Math.floor(timeElapsed)
                let seconds = Math.floor((timeElapsed - minutes) * 60)
                setCommandDuration(`${minutes} minute(s) and ${seconds} seconds`)
            }, 1000)
        }
            
    }, [])  

    return (
        <div>
            <p>{props.amount}</p>
            <p>{commandDuration}</p>
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