import { Interaction, CacheType, GuildChannel, GuildMember } from "discord.js";
import Arguments from "../core/arguments.js";
import { CommandHandle } from "../core/command.js";
import Event from "../core/event.js";
import Guild from "../entities/guild.js";
import { getCommands } from "../helpers/command.js";

export default class InteractionCreateEvent extends Event<"interactionCreate"> {
	constructor() {
		super("interactionCreate");
	}

	async on(interaction: Interaction<CacheType>): Promise<void> {
		if (!interaction.isCommand()) return;
        await interaction.deferReply();
		const argumentValues = {};
		for (const option of interaction.options.data) {
			argumentValues[option.name] = option.value;
		}

		const command = getCommands().find((c) => c.name == interaction.commandName);
		if (!command) return;
		command.execute(
			new CommandHandle(
				new Arguments(argumentValues),
				await Guild.findOne(interaction.guild.id),
				interaction.guild,
				interaction.channel as GuildChannel,
				interaction.member as GuildMember,
				null,
				interaction,
			),
		);
	}
}
