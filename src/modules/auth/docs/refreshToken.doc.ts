import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class RefreshTokenSuccessfulDoc {
	@ApiProperty({ example: "1dd07a96-5878-472d-98a7-59aa3e46473d" })
	userId: string;

	@ApiProperty({ example: "john.doe@example.com" })
	email: string;

	@ApiProperty({
		example:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxZGQwN2E5Ni01ODc4LTQ3MmQtOThhNy01OWFhM2U0NjQ3M2QiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzA4NTk4MDMyLCJleHAiOjE3MDg2MDE2MzJ9.E6VPQFwRBFe006Lp3RH3uBZiGMcytUgUkUqDDoirAlk",
	})
	accessToken: string;

	@ApiProperty({
		example:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxZGQwN2E5Ni01ODc4LTQ3MmQtOThhNy01OWFhM2U0NjQ3M2QiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzA4NTk4MDMyLCJleHAiOjE3MDkyMDI4MzJ9.c8-C0OLbuFEGTCb1UlWdecJu5N26knhxVmVms44-WME",
	})
	refreshToken: string;

	@ApiProperty({ example: 1708601632032 })
	expiresIn: number;
}
