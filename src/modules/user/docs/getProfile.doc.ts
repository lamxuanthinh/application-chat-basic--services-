import { ApiProperty } from "@nestjs/swagger";

export class GetProfileSuccessfulDoc {
	@ApiProperty({ example: "1dd07a96-5878-472d-98a7-59aa3e46473d" })
	id: string;

	@ApiProperty({ example: "John Doe" })
	name: string;

	@ApiProperty({
		example: "john.doe@example.com",
	})
	email: string;

	@ApiProperty({
		example: "2024-02-20T01:33:50.606Z",
	})
	createdAt: string;

	@ApiProperty({ example: "2024-02-20T01:33:50.606Z" })
	updatedAt: number;
}
