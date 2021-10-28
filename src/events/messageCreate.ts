import { GuildChannel, Message } from "discord.js";
import { getConnection } from "typeorm";
import Event from "../core/event.js";
import Guild from "../entities/guild.js";
import { getCommands } from "../helpers/command.js";
import { getGuild } from "../helpers/database.js";

export default class MessageCreateEvent extends Event<"messageCreate"> {
	constructor() {
		super("messageCreate");
	}

	async on(message: Message): Promise<void> {
		if (message.author.bot) return;
		let guild = await getGuild(message.guild.id);
		const prefix = guild.prefix;

		let text = message.content;
		text = text.trim();

		if (!text.startsWith(prefix)) return;
		// Remove the first occurence of the prefix in text
		text = text.substring(prefix.length);
		const splitted = text.split(" ");
		const commandName = splitted[0].trim();
		const command = getCommands().find((c) => {
			if (c.name == commandName || c.aliases.includes(commandName)) return true;
			return false;
		});
		if (command) command.execute(guild, message, null);
	}
}
