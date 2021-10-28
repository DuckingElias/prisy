import { readFile } from "fs/promises";
import Language from "../core/language.js";
import dot from "dot-object";
export const languages: Language[] = [];

export async function loadLanguages() {
	const rawLanguages = JSON.parse((await readFile("./language/languages.json")).toString());
	for (const rawLanguage of rawLanguages) {
		const translations = JSON.parse(
			(await readFile(`./language/${rawLanguage["file"]}`)).toString(),
		);
		languages.push(
			new Language(rawLanguage["code"], rawLanguage["flag"], rawLanguage["label"], translations),
		);
	}
}

export function getLanguage(code: string): Language {
	return languages.find((language) => language.code === code);
}

export function t(code: string, node: string, ...args: string[]): string {
	const language = getLanguage(code);
	let message: string = dot.pick(node, language.translationData) as string;
	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		message = message.replaceAll(`{${i}}`, arg);
	}
	return message;
}
