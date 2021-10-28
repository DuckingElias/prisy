import { ClientEvents } from "discord.js";

export default abstract class Event<K extends keyof ClientEvents> {
	public readonly eventName: string;

	constructor(eventName: keyof ClientEvents) {
		this.eventName = eventName;
	}

	abstract on(...args: ClientEvents[K]): Promise<void>;
}
