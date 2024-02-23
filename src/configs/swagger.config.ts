import { DocumentBuilder, OpenAPIObject } from "@nestjs/swagger";

export const swaggerConfig = (): Omit<OpenAPIObject, "paths"> => {
	const config = new DocumentBuilder()
		.setTitle("Application Chat Basic")
		.setDescription("The API description")
		.setVersion("1.0")
		.addTag("API")
		.addBearerAuth()
		.addSecurity("user ID", {
			type: "apiKey",
			in: "header",
			name: "x-api-client",
		})
		.addSecurity("Refresh Token", {
			type: "apiKey",
			in: "header",
			name: "refresh-token",
		})
		.build();
	return config;
};
