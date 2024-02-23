import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { HEADER } from "@src/utils";
import { AuthService } from "@modules/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private authService: AuthService,
		private jwtService: JwtService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {
			const request = context.switchToHttp().getRequest();
			const { userId, accessToken, refreshToken } = this.extractTokenFromHeader(request) ?? {};

			if (!userId || !accessToken) throw new UnauthorizedException("Token can't empty");
			const secretKey = await this.authService.getSecretKeyByUserId(userId);

			if (refreshToken) {
				const decoded = this.jwtService.verify(refreshToken, { secret: `${secretKey.publicKey}` });
				if (!decoded) throw new UnauthorizedException("Token Invalid");
				decoded.oldRefreshToken = refreshToken;

				request["user"] = decoded;
				return true;
			}

			const decoded = this.jwtService.verify(accessToken, { secret: `${secretKey.privateKey}` });
			if (!decoded) throw new UnauthorizedException("Token Invalid");
			request["user"] = decoded;
		} catch (error) {
			throw new UnauthorizedException("Token Invalid");
		}

		return true;
	}

	private extractTokenFromHeader(request: Request) {
		const accessToken = request.headers[HEADER.AUTHORIZATION]?.toString()?.replace("Bearer ", "");
		const userId = request.headers[HEADER.CLIENT_ID]?.toString();
		const refreshToken = request.headers[HEADER.REFRESH_TOKEN]?.toString();

		return { accessToken, userId, refreshToken };
	}
}
