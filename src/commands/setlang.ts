import { GuildMember, GuildChannel, Message, MessageEmbed } from "discord.js";
import arguments from "../core/arguments.js";
import { Category } from "../core/category.js";
import Command, { CommandHandle } from "../core/command.js";
import Guild from "../entities/guild.js";
import { getLanguage, languages } from "../helpers/language.js";
import ArgumentDefinition, { ArgumentType } from "../interfaces/argument.js";

export default class SetLangCommand extends Command {
	constructor() {
		super("setlang", Category.CONFIGURATION, ["setlanguage", "set-lang", "set-language"]);
	}

	public arguments(): ArgumentDefinition[] {
		return [
			{
				name: "language",
				type: ArgumentType.STRING,
				optional: false,
			},
		];
	}

	async execute(handle: CommandHandle): Promise<void> {
		let { guildData, message, args} = handle;
		const language = getLanguage(args.text("language"));
		let description =
			guildData.t("commands.setlang.errors.language_not_found", args.text("language")) + "\n\n";
		for (let language of languages) {
			description += `${language.flag} ${language.label} - \`${language.code}\`\n`;
		}
		if (language == null) {
			handle.error("setlang", description + "\n")
			return;
		}

		guildData.language = language.code;
		guildData = await guildData.save();
		await handle.success(
			"setlang",
			guildData.t("commands.setlang.success", language.flag, language.label),
		)
	}
}
