import { GuildMember } from "discord.js";

export default class Arguments {
	string(name: string): string {
		return "";
	}

	number(name: string): number {
		return 1;
	}

	boolean(name: string): boolean {
		return true;
	}

	user(name: string): GuildMember {
		return null;
	}
}
