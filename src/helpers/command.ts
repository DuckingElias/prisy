import { ClientEvents } from "discord.js";
import { readdir } from "fs/promises";
import { getClient } from "../core/client.js";
import { silly } from "./logger.js";
import Event from "../core/event.js";
import Command from "../core/command.js";

const commands: Command[] = [];

export function getCommands(): Command[] {
	return commands;
}

export async function loadCommands() {
	const fileNames = await readdir("./dist/commands");
	for (const fileName of fileNames) {
		if (!fileName.endsWith(".js")) continue;
		const path = "../commands/" + fileName;
		const importedClass: Command = new (await import(path)).default();
		commands.push(importedClass);
		silly(`Registered command "${importedClass.name}"`);
	}
}
