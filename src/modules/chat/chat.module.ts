import { Module } from "@nestjs/common";
import { ChatService } from "@modules/chat/chat.service";
import { ChatGateway } from "@modules/chat/chat.gateway";

@Module({
	providers: [ChatGateway, ChatService],
})
export class MessagesModule {}
