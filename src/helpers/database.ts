import { readdir } from "fs/promises";
import { ConnectionOptions, createConnection, EntitySchema } from "typeorm";
import Guild from "../entities/guild.js";
import { getConfig } from "./config.js";
import { info } from "./logger.js";

export async function getEntityClasses(): Promise<EntitySchema[]> {
	const fileNames = await readdir("./dist/entities");
	const classes = [];
	for (let fileName of fileNames) {
		if (!fileName.endsWith(".js")) continue;
		const entityClass = (await import(`../entities/${fileName}`)).default;
		classes.push(entityClass as EntitySchema);
	}
	return classes;
}

export async function connect() {
	const entityConfig = {
		entities: await getEntityClasses(),
	};
	const connection = await createConnection({
		...getConfig().database,
		...entityConfig,
	} as ConnectionOptions);
	info("Connected to database");
}

export async function getGuild(id: string): Promise<Guild> {
	let guild = await Guild.findOne(id);
	if (guild) return guild;
	guild = new Guild();
	guild.id = id;
	guild.prefix = getConfig().guild_defaults.prefix;
	guild.language = getConfig().guild_defaults.language;
	return await guild.save();
}
