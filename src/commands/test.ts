import { GuildMember, GuildChannel, Message, MessageEmbed } from "discord.js";
import arguments from "../core/arguments.js";
import { Category } from "../core/category.js";
import Command, { CommandHandle } from "../core/command.js";
import Guild from "../entities/guild.js";
import ArgumentDefinition, { ArgumentType } from "../interfaces/argument.js";

export default class TestCommand extends Command {
	constructor() {
		super("test", Category.MISC);
	}

	public arguments(): ArgumentDefinition[] {
		return [];
	}

	async execute(handle: CommandHandle): Promise<void> {
		let { guildData, member, args} = handle;
		await handle.reply({
			embeds: [
				new MessageEmbed()
					.setColor(0x0000ff)
					.setTitle(guildData.t("commands.test.title"))
					.setAuthor(member.user.username, member.avatarURL())
					.setDescription(guildData.t("commands.test.description")),
			],
		});
	}
}
