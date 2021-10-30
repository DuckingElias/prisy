import { GuildMember } from "discord.js";

export default class Arguments {
	public readonly argumentValues: { [key: string]: any };

	constructor(argumentValues: { [key: string]: any }) {
		this.argumentValues = argumentValues;
	}

	string(name: string): string {
		return this.argumentValues[name].replaceAll(" ", "");
	}

	text(name: string): string {
		if (this.argumentValues[name].startsWith('"') && this.argumentValues[name].endsWith('"')) {
			return this.argumentValues[name].substring(1, this.argumentValues[name].length - 1);
		}
		return this.argumentValues[name];
	}

	number(name: string): number {
		try {
			return Number(this.argumentValues[name]);
		} catch (e) {
			return null;
		}
	}

	boolean(name: string): boolean {
		if (this.argumentValues[name] === "true") return true;
		if (this.argumentValues[name] === "false") return false;
		return null;
	}

	user(name: string): GuildMember {
		return null;
	}
}
