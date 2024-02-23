import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiHeader } from "@nestjs/swagger";
import { UserService } from "@modules/user/user.service";
import { AuthGuard } from "@modules/auth/auth.guard";
import { HEADER } from "@src/utils";
import { RequestToGuard } from "@modules/auth/interfaces";
import { GetProfileSuccessfulDoc } from "@modules/user/docs";

@ApiTags("Users")
@Controller("user")
export class UserController {
	constructor(private userService: UserService) {}

	@UseGuards(AuthGuard)
	@Get("profile")
	@ApiBearerAuth()
	@ApiHeader({ name: HEADER.CLIENT_ID, required: true })
	@ApiOperation({ summary: "Get user profile" })
	@ApiResponse({ status: 200, description: "User profile retrieved successfully", type: GetProfileSuccessfulDoc })
	async getProfile(@Req() request: RequestToGuard) {
		return await this.userService.getProfile(request.user.userId);
	}
}
