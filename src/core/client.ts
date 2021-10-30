import { Client as DiscordClient, ColorResolvable, GuildMember, Message, MessageEmbed } from "discord.js";
import Guild from "../entities/guild.js";
import { REST } from "@discordjs/rest";
import { info, silly } from "../helpers/logger.js";
import { getConfig } from "../helpers/config.js";

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


const rest = new REST({
	version: "9",
});

/**
 * Returns the REST instance.
 * 
 * @returns {REST}
 */
export function getRest(token: string): REST {
	return rest.setToken(token);
}

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
