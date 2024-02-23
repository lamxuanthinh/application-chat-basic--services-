import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetProfileDto {
	@IsString()
	@IsNotEmpty()
	@IsUUID()
	@ApiProperty({ example: "1dd07a96-5878-472d-98a7-59aa3e46473d" })
	id: string;
}
