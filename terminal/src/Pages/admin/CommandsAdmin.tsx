import CommandAdmin from "../../Components/Admin/Command/CommandAdmin"
import React, {useEffect, useState} from "react"
import { getCommands } from "../../Services/CommandApi"

const CommandsAdmin = () => {

    const [commands, setCommands] = useState([])
    const [commandsLoaded, setCommandsLoaded] = useState(false)

    const commandsAction = async () => {
        const getCommandsApi = await getCommands()
        setCommands(getCommandsApi.commands)
        setCommandsLoaded(true)
    }

    useEffect(() => {
        commandsAction()
    }, [])

    if (commands.length > 0 && commandsLoaded) {
        return (
            <div>
                {commands.map((command:any) => {
                    return (
                        <div key={command.id}>
                            <p>status : {command.status}</p>
                            <p>amount : {command.amount}</p>
                            {command.products.map((product:any) => {
                                return(
                                    <div key={product.id}>
                                        <p>name: {product.product.name}</p>
                                        <p>price: {product.product.price}</p>
                                        {product.productHasIngredient?.map((ingredient:any) => {
                                            return(
                                                <div key={ingredient.id}>
                                                    <p>name:{ingredient.ingredient.name}</p>
                                                    <p>price:{ingredient.ingredient.price}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    } else {
        return (
            <div>
                wait
            </div>
        )
    }

}

export default CommandsAdmin