import { GuildChannel, Message, MessageEmbed } from "discord.js";
import { getConnection } from "typeorm";
import Arguments from "../core/arguments.js";
import { CommandHandle } from "../core/command.js";
import Event from "../core/event.js";
import Guild from "../entities/guild.js";
import { getCommands } from "../helpers/command.js";
import { getGuild } from "../helpers/database.js";
import { ArgumentType } from "../interfaces/argument.js";

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

		if (!text.startsWith(prefix)) {
			if (
				message.mentions.has(message.client.user, {
					ignoreEveryone: true,
					ignoreRoles: true,
				})
			) {
				await message.reply({
					embeds: [
						new MessageEmbed()
						.setColor(0x0000ff)
						.setTitle(guild.t("messages.my_prefix.title"))
						.setDescription(guild.t(
							"messages.my_prefix.description",
							"<@" + message.member.user.id + ">",
							guild.prefix,
						))
						.setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
					],
				});
			}
			return;
		}
		// Remove the first occurence of the prefix in text
		text = text.substring(prefix.length);
		const splitted = text.split(" ");
		const commandName = splitted[0].trim();
		splitted.shift();
		const command = getCommands().find((c) => {
			if (c.name == commandName || c.aliases.includes(commandName)) return true;
			return false;
		});

		if(!command) return;

		let argsRaw = splitted.join(" ");
		let args = argsRaw.split(/\s(?=(?:(?:[^"]*"){2})*[^"]*$)/).map((arg) => arg.trim());
		if (args[0].trim() == "") args.shift();

		function isArgumentTypeValid(original: ArgumentType, check: ArgumentType): boolean {
			if (original == ArgumentType.BOOLEAN) {
				if (check == ArgumentType.BOOLEAN) return true;
			}

			if (original == ArgumentType.NUMBER) {
				if (check == ArgumentType.NUMBER) return true;
			}

			if (original == ArgumentType.TEXT) {
				if (check == ArgumentType.NUMBER) return true;
				if (check == ArgumentType.TEXT) return true;
				if (check == ArgumentType.BOOLEAN) return true;
				if (check == ArgumentType.STRING) return true;
				if (check == ArgumentType.USER) return true;
			}

			if (original == ArgumentType.STRING) {
				if (check == ArgumentType.NUMBER) return true;
				if (check == ArgumentType.BOOLEAN) return true;
				if (check == ArgumentType.STRING) return true;
				if (check == ArgumentType.USER) return true;
			}

			if (original == ArgumentType.USER) {
				if (check == ArgumentType.USER) return true;
			}

			return false;
		}

		function getArgumentType(value: string): ArgumentType {
			if (value.startsWith('"') && value.endsWith('"')) {
				value = value.substring(1, value.length - 1);
				value = value.trim();
			}
			if (value == "true" || value == "false") return ArgumentType.BOOLEAN;
			if (value.startsWith("<@") && value.endsWith(">")) return ArgumentType.USER;
			if (!isNaN(value as unknown as number)) return ArgumentType.NUMBER;
			if (value.includes(" ")) return ArgumentType.TEXT;
			return ArgumentType.STRING;
		}

		const argumentDefinitions = command.arguments();
		const argumentValues = {};
		for (let i = 0; i < argumentDefinitions.length; i++) {
			const argumentDefinition = argumentDefinitions[i];
			const arg = args[i];

			if (arg == undefined && !argumentDefinition.optional) {
				await message.reply({
					embeds: [
						new MessageEmbed()
							.setColor(0xff0000)
							.setTitle(
								guild.t(
									"commands.error_messages.error_title",
									guild.t("commands." + command.name + ".title"),
								),
							)
							.setAuthor(message.author.username, message.author.avatarURL())
							.setDescription(
								guild.t(
									"commands.error_messages.missing_argument",
									guild.t(
										"commands." + command.name + ".args." + argumentDefinition.name + ".title",
									),
								),
							),
					],
				});
				return;
			}

			if (!isArgumentTypeValid(argumentDefinition.type, getArgumentType(arg))) {
				await message.reply({
					embeds: [
						new MessageEmbed()
							.setColor(0xff0000)
							.setTitle(
								guild.t(
									"commands.error_messages.error_title",
									guild.t("commands." + command.name + ".title"),
								),
							)
							.setAuthor(message.author.username, message.author.avatarURL())
							.setDescription(
								guild.t(
									"commands.error_messages.wrong_argument",
									guild.t(
										"commands." + command.name + ".args." + argumentDefinition.name + ".title",
									),
								),
							),
					],
				});
				return;
			}

			argumentValues[argumentDefinition.name] = arg;
		}

		if (command) command.execute(new CommandHandle(new Arguments(argumentValues), guild, message.guild, message.channel as GuildChannel, message.member, message, null));
	}
}
