import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "@modules/auth/auth.controller";
import { AuthService } from "@modules/auth/auth.service";
import { Token } from "@modules/auth/entities";
import { AuthGuard } from "@modules/auth/auth.guard";
import { UserModule } from "@modules/user/user.module";

@Module({
	imports: [TypeOrmModule.forFeature([Token]), forwardRef(() => UserModule), JwtModule],
	controllers: [AuthController],
	providers: [AuthService, AuthGuard],
	exports: [TypeOrmModule, AuthGuard, AuthService],
})
export class AuthModule {}
