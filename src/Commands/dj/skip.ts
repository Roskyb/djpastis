import { Command } from "../../Interfaces/Commands";


export const command: Command = {
    name: 'skip',
    aliases: ['fs'],
    run: async (client, message, args) => {
        console.log(  client.serverQueue.get(message.guild?.id!)?.songs)
        try {
            let songs = client.serverQueue.get(message.guild?.id!)?.songs
            if(songs?.length! > 0){
                songs!.shift();
                console.log(  client.serverQueue.get(message.guild?.id!)?.songs)
                client.playSong(message.member?.guild.id! , songs![0])
            } 


        } catch (err) {
            console.log(err)
        }



    }
}