import { ILogObject, Logger } from "tslog";

export const logger: Logger = new Logger({
	displayFilePath: "hidden",
	displayFunctionName: false,
});

export function info(...args: unknown[]): ILogObject {
	return logger.info(...args);
}

export function warn(...args: unknown[]): ILogObject {
	return logger.warn(...args);
}

export function error(...args: unknown[]): ILogObject {
	return logger.error(...args);
}

export function fatal(...args: unknown[]): ILogObject {
	return logger.fatal(...args);
}

export function debug(...args: unknown[]): ILogObject {
	return logger.debug(...args);
}

export function silly(...args: unknown[]): ILogObject {
	return logger.silly(...args);
}

export function trace(...args: unknown[]): ILogObject {
	return logger.trace(...args);
}
