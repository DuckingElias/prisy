import { Client as DiscordClient, ColorResolvable, Message, MessageEmbed } from "discord.js";
import Guild from "../entities/guild.js";
import { info, silly } from "../helpers/logger.js";

let client: DiscordClient = new DiscordClient({
	intents: [
		"GUILDS",
		"GUILD_MEMBERS",
		"GUILD_BANS",
		"GUILD_MESSAGES",
		"GUILD_MESSAGE_REACTIONS",
		"DIRECT_MESSAGES",
		"DIRECT_MESSAGE_REACTIONS",
		"DIRECT_MESSAGE_TYPING",
		"GUILD_PRESENCES",
		"GUILD_VOICE_STATES",
		"GUILD_WEBHOOKS",
		"GUILD_INVITES",
		"GUILD_INTEGRATIONS",
	],
});

/**
 * Returns the client instance.
 *
 * @returns {DiscordClient}
 */
export function getClient(): DiscordClient {
	return client;
}

/**
 * Logs in the client into Discord.
 *
 * @param token string
 * @returns {Promise<void>}
 * @throws {Error}
 */
export async function login(token: string): Promise<void> {
	await client.login(token);
	silly(`Logged into Discord`);
}

export function generateEmbed(
	guild: Guild,
	message: Message,
	color: ColorResolvable,
	title: string,
	description: string,
): MessageEmbed {
	return new MessageEmbed()
		.setColor(color)
		.setTitle(title)
		.setAuthor(message.author.username, message.author.avatarURL())
		.setDescription(description);
}

export async function replyError(
	guild: Guild,
	message: Message,
	commandName: string,
	description: string,
): Promise<void> {
	await message.reply({
		embeds: [
			generateEmbed(
				guild,
				message,
				0xff0000,
				guild.t(
					"commands.error_messages.error_title",
					guild.t("commands." + commandName + ".title"),
				),
				description,
			),
		],
	});
}

export async function replySuccess(
	guild: Guild,
	message: Message,
	commandName: string,
	description: string,
): Promise<void> {
	await message.reply({
		embeds: [
			generateEmbed(
				guild,
				message,
				0x00ff00,
				guild.t("commands." + commandName + ".title"),
				description,
			),
		],
	});
}
