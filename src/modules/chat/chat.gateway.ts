import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from "@nestjs/websockets";
import { ChatService } from "@modules/chat/chat.service";
import { CreateChatDto, TypingDto } from "@modules/chat/dto";
import { Socket, Server } from "socket.io";

@WebSocketGateway({ core: { origins: "*" } })
export class ChatGateway {
	@WebSocketServer()
	server: Server;

	constructor(private readonly chatService: ChatService) {}

	@SubscribeMessage("createMessage")
	async createChat(@MessageBody() createChatDto: CreateChatDto) {
		const message = await this.chatService.createChat(createChatDto);
		this.server.emit("message", message);

		return message;
	}

	@SubscribeMessage("findAllMessages")
	async findAll() {
		return await this.chatService.findAllChat();
	}

	@SubscribeMessage("typing")
	async typing(@MessageBody() typingDto: TypingDto, @ConnectedSocket() client: Socket) {
		const { userId, name } = typingDto;
		client.broadcast.emit("typing", { userId, name });
	}
}
