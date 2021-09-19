import { Command } from "../../Interfaces/Commands";


export const command: Command = {
    name: 'leave',
    aliases: ['lv'],
    run: async (client, message, args) => {
        
        try {
            await message.member?.voice.channel?.leave()
            client.serverQueue.delete(message.guild?.id!)

        } catch (err) {
            console.log(err)
        }



    }
}