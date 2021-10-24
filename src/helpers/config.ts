import { parse } from "toml";
import { readFile } from "fs/promises";
import Config from "../interfaces/config.js";
import { info, silly } from "./logger.js";

let config: Config;

/**
 * Returns the config object.
 *
 * @returns {Config}
 */
export function getConfig(): Config {
	return config;
}

/**
 * Loads and parses the config file.
 *
 * @param filePath string
 * @returns {Promise<void>}
 */
export async function loadConfig(filePath: string): Promise<void> {
	const data = await readFile(filePath, "utf8");
	config = parse(data.toString()) as Config;
	silly(`Loaded config from "${filePath}"`);
}
