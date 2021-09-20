import { Command } from "../../Interfaces/Commands";
import ytdl from "ytdl-core";
import { QueveConstruct } from "../../Interfaces/QueveConstruct";
import { Channel, TextChannel } from "discord.js";
import { url } from "inspector";
import ytsr from "ytsr";
import { isValidUrl } from "../../Utils/Utils";

export const command: Command = {
    name: 'play',
    aliases: ['p'],
    run: async (client, message, args) => {
        let serverQueue = client.serverQueue
        try {
            let arg = args.join(" ");
            if(!isValidUrl(arg)) {
                const search = await ytsr(arg,  { pages: 1 });
                let item: any = search.items[0];
                arg = item.url;
            } 

            

            const songInfo = await ytdl.getInfo(arg)
            
            const song: Song = {
                name: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url
            }


            let guildId = message.guild?.id || '';
            if (!serverQueue.lastKey()) {
                let songs: Song[] = [song];
                let queue: QueveConstruct = {
                    textChannel: message.channel as TextChannel,
                    voiceChannel: message.member?.voice?.channel!,
                    songs: songs,
                    connection: null,
                    playing: true
                }
                serverQueue.set(guildId, queue);
                message.channel.send(`${song.name} has added to the new queue!`)
                let connection = await message.member?.voice.channel?.join()
                queue.connection = connection
                client.playSong(message.guild?.id!, song);
            } else {
                let queue = serverQueue.get(guildId)
                queue?.songs.push(song)
                message.channel.send(`${song.name} has added to the queue!`)
            }
            


           



        } catch (err) {
            console.log("Cannot play or connect the current song: " + err)
        }



    }
}