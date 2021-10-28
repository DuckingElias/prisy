export enum ArgumentType {
	STRING,
	TEXT,
	NUMBER,
	BOOLEAN,
	USER,
}

export default interface ArgumentDefinition {
	name: string;
	type: ArgumentType;
	optional: boolean;
}
