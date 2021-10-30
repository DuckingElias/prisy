import { CacheType, ColorResolvable, Guild, GuildChannel, GuildMember, Interaction, Message, MessageEmbed, MessagePayload, ReplyMessageOptions } from "discord.js";
import GuildData from "../entities/guild.js";
import ArgumentDefinition from "../interfaces/argument.js";
import Arguments from "./arguments.js";
import { Category } from "./category.js";

export class CommandHandle {

	public readonly args: Arguments;
	public readonly guildData: GuildData;
	public readonly guild: Guild;
	public readonly channel: GuildChannel;
	public readonly member: GuildMember;
	public readonly message?: Message;
	public readonly interaction?: Interaction<CacheType>

	constructor(args: Arguments, guildData: GuildData, guild: Guild, channel: GuildChannel, member: GuildMember, message?: Message, interaction?: Interaction<CacheType>) {
		this.args = args;
		this.guildData = guildData;
		this.guild = guild;
		this.channel = channel;
		this.member = member;
		this.message = message;
		this.interaction = interaction;
	}

	async reply(options: string | MessagePayload | ReplyMessageOptions): Promise<void> {
		if (this.message) {
			await this.message.reply(options);
		} 

		if(this.interaction) {
			/// @ts-ignore
			await this.interaction.editReply(options);
		}
	}

	private generateEmbed(
		color: ColorResolvable,
		title: string,
		description: string,
	): MessageEmbed {
		return new MessageEmbed()
			.setColor(color)
			.setTitle(title)
			.setAuthor(this.member.user.username, this.member.avatarURL())
			.setDescription(description);
	}

	async error(commandName: string, description: string): Promise<void> {
		this.reply({
			embeds: [
				this.generateEmbed(
					0xff0000,
					this.guildData.t(
						"commands.error_messages.error_title",
						this.guildData.t("commands." + commandName + ".title"),
					),
					description,
				)
			]
		})
	}

	async success(commandName: string, description: string): Promise<void> {
		this.reply({
			embeds: [
				 this.generateEmbed(
					0x00ff00,
					this.guildData.t("commands." + commandName + ".title"),
					description,
				)
			]
		})
	}

}

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
	abstract execute(handle: CommandHandle): Promise<void>;
}
