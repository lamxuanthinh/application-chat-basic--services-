import { ApiProperty } from "@nestjs/swagger";

export class LogoutSuccessfulDoc {
	@ApiProperty({ example: "Logout successful" })
	message: string;
}
