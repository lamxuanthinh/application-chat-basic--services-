import { Injectable, BadRequestException, UnprocessableEntityException, ForbiddenException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IRefreshToken, ISignIn, ISignUp, IPayload } from "@modules/auth/interfaces";
import { createSecretKeys, globalConstants } from "@src/utils";
import { Token } from "@modules/auth/entities";
import { JwtService } from "@nestjs/jwt";
import { getTimeExpires } from "@src/utils/getTimeExpires.utils";
import { UserService } from "@modules/user/user.service";

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(Token)
		private tokensRepository: Repository<Token>,
		private jwtService: JwtService,
		private userService: UserService,
	) {}

	async signUp({ email, password, name }: ISignUp) {
		const checkUniqueEmail = await this.userService.findUserByEmail(email);
		if (checkUniqueEmail) throw new BadRequestException("Email already exists");

		const hashPassword = await bcrypt.hash(password, globalConstants.SALT_ROUNDS);
		const createUser = await this.userService.createUser(email, hashPassword, name);

		const { privateKey, publicKey } = createSecretKeys();
		const createSecretKey = await this.tokensRepository.save({
			userId: createUser.id,
			privateKey,
			publicKey,
		});
		if (!createSecretKey) throw new UnprocessableEntityException("Create secret key failed");

		const { password: userPassword, role, ...rest } = createUser;
		return { createUser: rest };
	}

	async signIn({ email, password }: ISignIn) {
		const checkExitingEmail = await this.userService.findUserByEmail(email);
		if (!checkExitingEmail) throw new BadRequestException("Email does not exist");
		const { id: userId, role } = checkExitingEmail;

		const checkPassword = await bcrypt.compare(password, checkExitingEmail.password);
		if (!checkPassword) throw new ForbiddenException("Password is incorrect");

		const tokens = await this.tokensRepository.findOne({ where: { userId } });
		if (!tokens) throw new UnprocessableEntityException("Get secret key failed");
		const { privateKey, publicKey } = tokens;

		const payload = { userId, email, role };
		const { accessToken, refreshToken } = this.createPairToken(payload, privateKey, publicKey);

		tokens.refreshTokenNow.push(refreshToken);
		const updateRefreshToken = await this.handleUpdateRefreshToken(tokens);
		if (!updateRefreshToken) throw new UnprocessableEntityException("Update refresh token failed");

		return {
			user: {
				userId,
				email,
			},
			accessToken,
			refreshToken,
			expiresIn: getTimeExpires(globalConstants.TIME_EXPIRES_IN),
		};
	}

	async refreshToken({ userId, email, role, oldRefreshToken }: IRefreshToken) {
		const tokens = await this.tokensRepository.findOne({ where: { userId } });
		if (!tokens) throw new ForbiddenException("Unauthorized login notification");
		const { privateKey, publicKey, refreshTokenNow } = tokens;

		const checkRefreshToken = refreshTokenNow.includes(oldRefreshToken);
		if (!checkRefreshToken) {
			/*
				Warning: Unauthorized Login Detected - Sending Email Notification
			*/
			throw new ForbiddenException("Refresh token is loss");
		}

		const payload = { userId, email, role };
		const { accessToken: newAccessToken, refreshToken: newRefreshToken } = this.createPairToken(
			payload,
			privateKey,
			publicKey,
		);

		tokens.refreshTokenNow = tokens.refreshTokenNow.filter((token) => token !== oldRefreshToken);
		const updateRefreshToken = await this.handleUpdateRefreshToken(tokens);
		if (!updateRefreshToken) throw new UnprocessableEntityException("Update refresh token failed");

		return {
			user: {
				userId,
				email,
			},
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
			expiresIn: getTimeExpires(globalConstants.TIME_EXPIRES_IN),
		};
	}

	async logOut({ userId, email, oldRefreshToken }: IRefreshToken) {
		const tokens = await this.tokensRepository.findOne({ where: { userId } });
		if (!tokens) throw new ForbiddenException("Unauthorized login notification");

		tokens.refreshTokenNow = tokens.refreshTokenNow.filter((token) => token !== oldRefreshToken);
		const updateRefreshToken = await this.handleUpdateRefreshToken(tokens);
		if (!updateRefreshToken) throw new UnprocessableEntityException("Update refresh token failed");

		return { message: "Logout successful" };
	}

	async getSecretKeyByUserId(userId: string) {
		const secretKey = await this.tokensRepository.findOne({ where: { userId } });
		return {
			privateKey: secretKey?.privateKey,
			publicKey: secretKey?.publicKey,
		};
	}

	async handleUpdateRefreshToken(tokens: Token) {
		return await this.tokensRepository.save(tokens);
	}

	createPairToken(payload: IPayload, privateKey: string, publicKey: string) {
		const accessToken = this.jwtService.sign(payload, { secret: privateKey, expiresIn: "1h" });
		const refreshToken = this.jwtService.sign(payload, { secret: publicKey, expiresIn: "7d" });
		return { accessToken, refreshToken };
	}
}
