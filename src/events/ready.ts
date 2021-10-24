import Event from "../core/event.js";
import { Client as DiscordClient } from "discord.js";
import { getClient } from "../core/client.js";
import { info } from "../helpers/logger.js";

export default class ReadyEvent extends Event<"ready"> {
	constructor() {
		super("ready");
	}

	async on(client: DiscordClient) {
		info(`Ready as "${getClient().user.tag}"`);
	}
}
