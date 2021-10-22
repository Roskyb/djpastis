import { Client, Collection, TextChannel } from "discord.js";
import path from "path";
import { Command } from "../Interfaces/Commands";
import { Event } from "../Interfaces/Events";
import { Config } from "../Interfaces/Config";
import ConfigJson from "../config.json";
import { readdir, readdirSync } from "fs";
import { QueveConstruct } from "../Interfaces/QueveConstruct";
import ytdl from "ytdl-core";


class ExtendedClient extends Client {
    public commands: Collection<string, Command> = new Collection()
    public events: Collection<string, Event> = new Collection()
    public config: Config = ConfigJson
    public aliases: Collection<string, Command> = new Collection()
    public serverQueue: Collection<String, QueveConstruct> = new Collection();

    public async init() {
        this.login(this.config.token)



        // Commands

        const commandPath = path.join(__dirname, "..", "Commands");
        readdirSync(commandPath).forEach(dir => {
            const commands = readdirSync(`${commandPath}/${dir}`)
            for (const file of commands) {
                const {command} = require(`${commandPath}/${dir}/${file}`)
                this.commands.set(command.name, command)
               
                if(command?.aliases.length !== 0){
                    command.aliases.forEach((alias: any) => {
                        this.aliases.set(alias, command)
                    });
                }
                    
            }
        })


        // Events

        const eventPath = path.join(__dirname, "..", "Events")
        readdirSync(eventPath).forEach(async (file) => {
            const {event} = await import (`${eventPath}/${file}`)
            this.events.set(event.name, event)
            console.log(event)
            this.on(event.name, event.run.bind(null, this))
        })

    }

    

    public async playSong(guildId: String, song: Song) {

        let queue = this.serverQueue.get(guildId)

        if(!song){
            queue?.voiceChannel.leave()
            this.serverQueue.delete(guildId)
            console.log("Deleted queue")
            return;
        }


        const dispatcher = queue?.connection
            .play(ytdl(song.url))
            .on('finish', () => {
                queue?.songs.shift()
                this.playSong(guildId, queue?.songs[0]!);
            })
            .on('error', (error: any) => console.log(error))
            queue?.textChannel.send(`Currently playing ${song.name}`)
        
    }
}

export default ExtendedClient;
