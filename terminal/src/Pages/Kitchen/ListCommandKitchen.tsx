import { getCommandsStatus } from "../../Services/CommandApi"
import {useEffect, useState} from "react"
import { Command } from "../../Interfaces/Command"
import CommandSingleKitchen from "../../Components/Kitchen/CommandSingleKitchen"

interface CommandWithId extends Command {
    id : number
}

const ListCommandKitchen = () => {

    const [commands, setCommands] = useState([])

    const getCommandUndone = async () => {
        const commandsUndone:any = await getCommandsStatus("preparation")
        setCommands(commandsUndone.commands)
    }

    useEffect(() => {
        getCommandUndone()
    }, [])
    
    useEffect(() => {
        console.log(commands);
    }, [commands])
    

    return (
        commands.map((command:CommandWithId) => {
            return(<CommandSingleKitchen key={command.id} id={command.id} amount={command.amount} products={command.products} />)
        })
    )
}

export default ListCommandKitchen