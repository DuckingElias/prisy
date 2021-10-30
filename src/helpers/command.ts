import { ClientEvents } from "discord.js";
import { readdir } from "fs/promises";
import { getClient, getRest } from "../core/client.js";
import { silly } from "./logger.js";
import { Routes } from "discord-api-types/v9";
import Event from "../core/event.js";
import Command from "../core/command.js";
import { getConfig } from "./config.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { t } from "./language.js";
import { ArgumentType } from "../interfaces/argument.js";

const commands: Command[] = [];

export function getCommands(): Command[] {
	return commands;
}

export async function deploySlashCommands() {
	let restPath = Routes.applicationCommands(getConfig().discord.application_id);
	if (getConfig().discord.command_registration_type == "guild") {
		restPath = Routes.applicationGuildCommands(
			getConfig().discord.application_id,
			getConfig().discord.development_guild_id,
		);
	}

	const slashCommands = [];

	for (const command of getCommands()) {
		let builder:
			| Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
			| SlashCommandBuilder = new SlashCommandBuilder();
		builder = builder.setName(command.name);
		builder = builder.setDescription(t("en", "commands." + command.name + ".description"));
		for (const arg of command.arguments()) {
			switch (arg.type) {
				case ArgumentType.BOOLEAN:
					builder = builder.addBooleanOption((option) =>
						option
							.setName(arg.name)
							.setDescription(
								t("en", "commands." + command.name + ".args." + arg.name + ".description"),
							)
							.setRequired(!arg.optional),
					);
					break;
				case ArgumentType.NUMBER:
					builder = builder.addNumberOption((option) =>
						option
							.setName(arg.name)
							.setDescription(
								t("en", "commands." + command.name + ".args." + arg.name + ".description"),
							)
							.setRequired(!arg.optional),
					);
					break;
				case ArgumentType.USER:
					builder = builder.addUserOption((option) =>
						option
							.setName(arg.name)
							.setDescription(
								t("en", "commands." + command.name + ".args." + arg.name + ".description"),
							)
							.setRequired(!arg.optional),
					);
					break;
				case ArgumentType.TEXT:
					builder = builder.addStringOption((option) =>
						option
							.setName(arg.name)
							.setDescription(
								t("en", "commands." + command.name + ".args." + arg.name + ".description"),
							)
							.setRequired(!arg.optional),
					);
					break;
				case ArgumentType.STRING:
					builder = builder.addStringOption((option) =>
						option
							.setName(arg.name)
							.setDescription(
								t("en", "commands." + command.name + ".args." + arg.name + ".description"),
							)
							.setRequired(!arg.optional),
					);
					break;
			}
		}
		slashCommands.push(builder.toJSON());
	}

	await getRest(getConfig().discord.token).put(restPath, {
		body: slashCommands,
	});
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

	await deploySlashCommands();
}
