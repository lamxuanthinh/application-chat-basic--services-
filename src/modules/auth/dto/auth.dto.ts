import { IsNotEmpty, IsString, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto {
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	@ApiProperty({ example: "john.doe@example.com" })
	email: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: "John Doe" })
	name: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: "password123" })
	password: string;
}

export class SignInDto {
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	@ApiProperty({ example: "john.doe@example.com" })
	email: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: "password123" })
	password: string;
}
