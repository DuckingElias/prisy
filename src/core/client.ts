import { Client as DiscordClient } from "discord.js";
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
