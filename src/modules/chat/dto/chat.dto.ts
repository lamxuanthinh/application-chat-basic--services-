export class CreateChatDto {
	userId: string;
	content: string;
}

export class TypingDto {
	userId: string;
	name: boolean;
}
