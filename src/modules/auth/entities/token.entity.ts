import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "@modules/shared";
import { User } from "@modules/user/entities";

@Entity({ name: "Tokens" })
export class Token extends BaseEntity {
	@ManyToOne(() => User, (user) => user.id)
	@Column({
		name: "user_id",
	})
	userId: string;

	@Column({
		name: "private_key",
	})
	privateKey: string;

	@Column({
		name: "public_key",
	})
	publicKey: string;

	@Column({
		name: "refresh_token_now",
		type: "text",
		array: true,
		default: [],
	})
	refreshTokenNow: string[];
}
