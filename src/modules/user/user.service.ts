import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@modules/user/entities";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) {}

	async getProfile(userId: string) {
		const profileUser = await this.usersRepository.findOne({
			where: { id: userId },
			select: ["id", "email", "name", "createdAt", "updatedAt"],
		});
		return { profileUser };
	}

	async findUserByEmail(email: string) {
		return await this.usersRepository.findOne({ where: { email } });
	}

	async createUser(email: string, password: string, name: string) {
		return await this.usersRepository.save({ email, password, name });
	}
}
