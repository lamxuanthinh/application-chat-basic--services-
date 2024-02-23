import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const postgreSqlConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
	return {
		type: "postgres",
		host: configService.get("POSTGRES_HOST") ?? "",
		port: +configService.get("POSTGRES_PORT") || 5432,
		username: configService.get("POSTGRES_USER") ?? "",
		password: configService.get("POSTGRES_PASSWORD") ?? "",
		database: configService.get("POSTGRES_DB") ?? "",
		autoLoadEntities: true,
		namingStrategy: new SnakeNamingStrategy(),
		synchronize: true,
	};
};
