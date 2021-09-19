import { Command } from "../../Interfaces/Commands";
import ytdl from "ytdl-core";
import { QueveConstruct } from "../../Interfaces/QueveConstruct";
import { Channel, TextChannel } from "discord.js";

export const command: Command = {
    name: 'play',
    aliases: ['p'],
    run: async (client, message, args) => {
        let serverQueue = client.serverQueue
        try {


            const songInfo = await ytdl.getInfo(args.join(" "))
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