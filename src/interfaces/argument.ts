export enum ArgumentType {
	STRING,
	TEXT,
	NUMBER,
	FLOAT,
	INTEGER,
	BOOLEAN,
	USER,
	CUSTOM,
}

export default interface ArgumentDefinition {
	name: string;
	type: ArgumentType;
	description: string;
	optional: boolean;
}
