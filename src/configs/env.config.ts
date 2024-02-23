import { ConfigService } from "@nestjs/config";

export const env = {
	app: {
		port: new ConfigService().get<string>("PORT") ?? 8080,
	},
};
