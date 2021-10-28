import { GuildMember, GuildChannel, Message, MessageEmbed } from "discord.js";
import arguments from "../core/arguments.js";
import { Category } from "../core/category.js";
import Command from "../core/command.js";
import Guild from "../entities/guild.js";
import ArgumentDefinition, { ArgumentType } from "../interfaces/argument.js";

export default class TestCommand extends Command {
	constructor() {
		super("test", Category.MISC);
	}

	public arguments(): ArgumentDefinition[] {
		return [];
	}

	async execute(guild: Guild, message: Message, args: arguments): Promise<void> {
		await message.reply({
			embeds: [
				new MessageEmbed()
					.setColor(0x0000ff)
					.setTitle(guild.t("commands.test.title"))
					.setAuthor(message.author.username, message.author.avatarURL())
					.setDescription(guild.t("commands.test.description")),
			],
		});
	}
}
