import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SignUpSuccessfulDoc {
	@ApiProperty({ example: "john.doe@example.com" })
	email: string;

	@ApiProperty({ example: "John Doe" })
	name: string;

	@ApiProperty({ example: "0f79e17d-196e-4cb9-8f92-9e54f605a83e" })
	id: string;

	@ApiProperty({ example: "2024-02-22T03:18:18.570Z" })
	createdAt: string;

	@ApiProperty({ example: "2024-02-22T03:18:18.570Z" })
	updatedAt: string;

	@ApiPropertyOptional({ example: null })
	deletedAt: string | null;
}

export class SignUpErrorExistEmailDoc {
	@ApiProperty({ example: "Email already exists" })
	message: string;

	@ApiProperty({ example: "Bad Request" })
	error: string;

	@ApiProperty({ example: 400 })
	statusCode: number;
}
