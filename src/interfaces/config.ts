export default interface Config {

	general: {
		auto_update: boolean;
	}

	discord: {
		token: string;
		command_registration_type: "global" | "guild";
		application_id: string;
		development_guild_id: string;
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
