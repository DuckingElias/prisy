import { readdir } from "fs/promises";
import { createConnection, EntitySchema } from "typeorm";
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
	const connection = await createConnection({
		type: "sqlite",
		database: getConfig().database.file,
		entities: await getEntityClasses(),
		synchronize: true,
	});
	info("Connected to database");
}
