import { MessageEmbed } from "discord.js";
import { Category } from "../core/category.js";
import Command, { CommandHandle } from "../core/command.js";
import { getCommands } from "../helpers/command.js";
import argument from "../interfaces/argument.js";

export default class HelpCommand extends Command {

    constructor() {
        super("help", Category.MISC, ["?", "cmdlist"])
    }

    arguments(): argument[] {
        return [];
    }

    async execute(handle: CommandHandle): Promise<void> {
        let {guildData, member, args} = handle;
        let embed = new MessageEmbed()
			.setColor(0x0000FF)
			.setTitle(guildData.t("commands.help.title", String(getCommands().length)))
			.setAuthor(member.user.username, member.user.avatarURL())
            .setDescription(guildData.t("commands.help.embed_description"))
            .setTimestamp();

        const commands = [];

        for (const command of getCommands()) {
            if(Object.keys(commands).includes(Category[command.category])) {
                commands[Category[command.category]].push(command.name);
            } else {
                commands[Category[command.category]] = [command.name];
            }
        }

        for (const [category, values] of Object.entries(commands)) {
            console.log(category);
            embed.addField(guildData.t("categorys." + category) + " (" + values.length + ")", values.join(", "));
        }
        await handle.reply({
            embeds: [embed]
        })
    }

}
