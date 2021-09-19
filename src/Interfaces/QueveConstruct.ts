import { Channel, TextChannel, VoiceChannel} from "discord.js";

export interface QueveConstruct {
    textChannel: TextChannel,
    voiceChannel: VoiceChannel,
    songs: Song[],
    connection: any,
    playing: boolean,
}