import { Message } from "discord.js";
import Client from "../Client"


interface Run {
    (client: Client, message: Message, args: string[]): any;
}

export interface Command {
    name: string;
    description?: string;
    aliases?: string[];
    run: Run;
}

