import { GuildMember, GuildChannel, Message, MessageEmbed } from "discord.js";
import arguments from "../core/arguments.js";
import { Category } from "../core/category.js";
import Command, { CommandHandle } from "../core/command.js";
import Guild from "../entities/guild.js";
import ArgumentDefinition, { ArgumentType } from "../interfaces/argument.js";
import leetspeak from "leetspeak";

export default class LeetCommand extends Command {
	constructor() {
		super("leet", Category.FUN, ["l33t"]);
	}

	public arguments(): ArgumentDefinition[] {
		return [
			{
				name: "text",
				optional: false,
				type: ArgumentType.TEXT,
			},
		];
	}

	async execute(handle: CommandHandle): Promise<void> {
		const { guildData, message, args} = handle;
		handle.success("leet", "```\n" + leetspeak(args.text("text")) + "```")
	}
}
