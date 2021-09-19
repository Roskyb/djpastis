import { Command } from "../../Interfaces/Commands";
import ytdl from "ytdl-core";
import { QueveConstruct } from "../../Interfaces/QueveConstruct";
import { Channel, TextChannel } from "discord.js";

export const command: Command = {
    name: 'help',
    aliases: ['h'],
    run: async (client, message, args) => {

        message.channel.send(`Avaible commands: 
    - !play or !p
    - !leave or !lv
    - !skip or !fs
        `)


    }
}