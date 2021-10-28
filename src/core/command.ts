import { GuildChannel, GuildMember, Message } from "discord.js";
import Guild from "../entities/guild.js";
import ArgumentDefinition from "../interfaces/argument.js";
import Arguments from "./arguments.js";
import { Category } from "./category.js";

export default abstract class Command {
	public readonly name: string;
	public readonly category: Category;
	public readonly aliases: string[];
	public readonly permissions: string[];

	public constructor(
		name: string,
		category: Category,
		aliases: string[] = [],
		permissions: string[] = [],
	) {
		this.name = name;
		this.category = category;
		this.aliases = aliases;
		this.permissions = permissions;
	}

	abstract arguments(): ArgumentDefinition[];
	abstract execute(guild: Guild, message: Message, args: Arguments): Promise<void>;
}
