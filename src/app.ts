import "reflect-metadata";
import { login } from "./core/client.js";
import { loadCommands } from "./helpers/command.js";
import { loadConfig, getConfig } from "./helpers/config.js";
import { loadEvents } from "./helpers/core.js";
import { connect } from "./helpers/database.js";
import { loadLanguages, t } from "./helpers/language.js";
import { fatal, info, warn } from "./helpers/logger.js";
import simpleGit, {SimpleGit} from "simple-git";
import path from "path";
import {exec, spawn} from "child_process";

async function checkForUpdates(): Promise<void> {
	const git: SimpleGit = simpleGit({
		baseDir: path.resolve("."),
		binary: "git",
		maxConcurrentProcesses: 6
	});

	await git.fetch();
	const status = await git.status();
	if(status.behind != 0) {
		warn(`A newer version of prisy is available (${status.behind} commits behind)`);
		if(getConfig().general.auto_update) {
			info("Auto update is enabled, performing update")
	
			if(status.conflicted.length != 0) {
				fatal("Cannot update due to conflicts. Resuming startup.");
			} else {
				const pull = await git.pull();
				info("Pulled newest version from Github");
				info("Compiling TypeScript...");
				await exec("npm run compile");
				info("Done! Stopping bot (Hopefully you use an process manager)");
				process.exit(0);
	
			}
		}
	}

}

/**
 * Start the application
 *
 * @returns {Promise<void>}
 */
async function start(): Promise<void> {
	try {
		await loadConfig("./config.toml");
		await checkForUpdates();
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
