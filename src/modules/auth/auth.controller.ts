import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "@modules/auth/auth.service";
import {
	SignInSuccessfulDoc,
	SignInErrorNotExistEmailDoc,
	SignUpSuccessfulDoc,
	SignUpErrorExistEmailDoc,
	SignInErrorWrongPasswordDoc,
	RefreshTokenSuccessfulDoc,
	LogoutSuccessfulDoc,
} from "@modules/auth/docs";
import { SignUpDto, SignInDto } from "@modules/auth/dto";
import { HEADER } from "@src/utils";
import { RequestToGuard } from "@modules/auth/interfaces";
import { AuthGuard } from "@modules/auth/auth.guard";

@ApiTags("Authentications")
@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("sign-up")
	@ApiOperation({ summary: "Sign up" })
	@ApiResponse({ status: 201, description: "Sign up successful", type: SignUpSuccessfulDoc })
	@ApiResponse({ status: 400, description: "Email already exists", type: SignUpErrorExistEmailDoc })
	async signUp(@Body() signUpDto: SignUpDto) {
		return await this.authService.signUp(signUpDto);
	}

	@Post("sign-in")
	@ApiOperation({ summary: "Sign in" })
	@ApiResponse({ status: 200, description: "Sign in successful", type: SignInSuccessfulDoc })
	@ApiResponse({ status: 403, description: "Password is incorrect", type: SignInErrorWrongPasswordDoc })
	@ApiResponse({ status: 400, description: "Email not exists", type: SignInErrorNotExistEmailDoc })
	async signIn(@Body() signInDto: SignInDto) {
		return await this.authService.signIn(signInDto);
	}

	@UseGuards(AuthGuard)
	@Post("refresh-token")
	@ApiBearerAuth()
	@ApiOperation({ summary: "Refresh token" })
	@ApiHeader({ name: HEADER.CLIENT_ID, required: true })
	@ApiHeader({ name: HEADER.REFRESH_TOKEN, required: true })
	@ApiResponse({ status: 200, description: "Refresh token successful", type: RefreshTokenSuccessfulDoc })
	async refreshToken(@Req() request: RequestToGuard) {
		return await this.authService.refreshToken(request.user);
	}

	@UseGuards(AuthGuard)
	@Post("log-out")
	@ApiBearerAuth()
	@ApiOperation({ summary: "Log out" })
	@ApiHeader({ name: HEADER.CLIENT_ID, required: true })
	@ApiHeader({ name: HEADER.REFRESH_TOKEN, required: true })
	@ApiResponse({ status: 200, description: "Logout successful", type: LogoutSuccessfulDoc })
	async logOut(@Req() request: RequestToGuard) {
		return await this.authService.logOut(request.user);
	}
}
