import { ClientEvents } from "discord.js";
import { readdir } from "fs/promises";
import { join } from "path";
import { getClient } from "../core/client.js";
import Event from "../core/event.js";
import { silly } from "./logger.js";

export async function loadEvents() {
	const fileNames = await readdir("./dist/events");
	for (const fileName of fileNames) {
		if (!fileName.endsWith(".js")) continue;
		const path = "../events/" + fileName;
		const importedClass = new (await import(path)).default() as Event<keyof ClientEvents>;
		getClient().on(importedClass.eventName, importedClass.on);
		silly(`Registered event handler "${importedClass.eventName}"`);
	}
}
