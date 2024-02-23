import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Chat } from "@modules/chat/entities";
import { InjectRepository } from "@nestjs/typeorm";
import { ICreateChat } from "@modules/chat/interfaces";

@Injectable()
export class ChatService {
	constructor(
		@InjectRepository(Chat)
		private chatRepository: Repository<Chat>,
	) {}

	async createChat({ userId, content }: ICreateChat) {
		const message = await this.chatRepository.save({ userId, content });
		return { message };
	}

	async findAllChat() {
		const allMessage = await this.chatRepository.find();
		return { allMessage };
	}
}
