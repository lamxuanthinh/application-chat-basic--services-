import { Entity, Column } from "typeorm";
import { BaseEntity } from "@modules/shared";
import { userRole } from "@src/utils";

@Entity({ name: "Users" })
export class User extends BaseEntity {
	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column({ default: userRole.USER_ROLE })
	role: string;
}
