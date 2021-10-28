import { GuildMember, GuildChannel, Message, MessageEmbed } from "discord.js";
import arguments from "../core/arguments.js";
import { Category } from "../core/category.js";
import { replyError, replySuccess } from "../core/client.js";
import Command from "../core/command.js";
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

	async execute(guild: Guild, message: Message, args: arguments): Promise<void> {
		const language = getLanguage(args.text("language"));
		let description =
			guild.t("commands.setlang.errors.language_not_found", args.text("language")) + "\n\n";
		for (let language of languages) {
			description += `${language.flag} ${language.label} - \`${language.code}\`\n`;
		}
		if (language == null) {
			await replyError(guild, message, "setlang", description + "\n");
			return;
		}

		guild.language = language.code;
		guild = await guild.save();
		await replySuccess(
			guild,
			message,
			"setlang",
			guild.t("commands.setlang.success", language.flag, language.label),
		);
	}
}
