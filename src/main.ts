import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { SwaggerModule } from "@nestjs/swagger";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "@src/app.module";
import { env, swaggerConfig } from "@src/configs";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			disableErrorMessages: false,
			skipMissingProperties: false,
		}),
	);

	const document = SwaggerModule.createDocument(app, swaggerConfig());
	SwaggerModule.setup("api-docs", app, document);

	await app.listen(env.app.port);
}
bootstrap();
