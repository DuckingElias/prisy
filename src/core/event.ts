import { ClientEvents } from "discord.js";

export default class Event<K extends keyof ClientEvents> {
	public readonly eventName: string;

	constructor(eventName: keyof ClientEvents) {
		this.eventName = eventName;
	}

	async on(...args: ClientEvents[K]): Promise<void> {}
}
