import { Module, forwardRef } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@modules/user/entities";
import { AuthModule } from "@modules/auth/auth.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
	imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule), JwtModule],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
