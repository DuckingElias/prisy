import { login } from "./core/client.js";
import { loadConfig, getConfig } from "./helpers/config.js";
import { loadEvents } from "./helpers/core.js";
import { fatal, info } from "./helpers/logger.js";

/**
 * Start the application
 *
 * @returns {Promise<void>}
 */
async function start(): Promise<void> {
	try {
		await loadConfig("./config.toml");
		await loadEvents();
		await login(getConfig().discord.token);
		info("Done");
	} catch (error) {
		fatal(error.message);
	}
}

start();
