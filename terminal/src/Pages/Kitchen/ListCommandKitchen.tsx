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

    return (
        commands.map((command:any) => {
            if (command.date){
                return(<CommandSingleKitchen key={command.id} id={command.id} amount={command.amount} products={command.products} date={command.date}  />)
            } 
        })
    )
}

export default ListCommandKitchen