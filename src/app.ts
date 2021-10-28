import "reflect-metadata";
import { login } from "./core/client.js";
import { loadCommands } from "./helpers/command.js";
import { loadConfig, getConfig } from "./helpers/config.js";
import { loadEvents } from "./helpers/core.js";
import { connect } from "./helpers/database.js";
import { loadLanguages, t } from "./helpers/language.js";
import { fatal, info } from "./helpers/logger.js";

/**
 * Start the application
 *
 * @returns {Promise<void>}
 */
async function start(): Promise<void> {
	try {
		await loadConfig("./config.toml");
		await loadLanguages();
		await connect();
		await loadEvents();
		await loadCommands();
		await login(getConfig().discord.token);
	} catch (error) {
		fatal(error.message);
	}
}

start();
