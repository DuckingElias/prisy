export default interface Config {
	discord: {
		token: string;
	};

	database: {
		type: string;
		file: string;
		host: string;
		port: number;
		username: string;
		password: string;
		database: string;
		synchronize: boolean;
		logging: boolean;
	};

	guild_defaults: {
		prefix: string;
		language: string;
	};
}
