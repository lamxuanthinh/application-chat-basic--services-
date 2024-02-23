import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "@modules/shared";
import { User } from "@modules/user/entities";

@Entity({ name: "Chats" })
export class Chat extends BaseEntity {
	@ManyToOne(() => User, (user) => user.id)
	@Column({
		name: "user_id",
	})
	userId: string;

	@Column({
		name: "content",
	})
	content: string;
}
