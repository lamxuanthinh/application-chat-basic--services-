export interface ISignUp {
	email: string;
	name: string;
	password: string;
}

export interface ISignIn {
	email: string;
	password: string;
}

export interface IRefreshToken {
	userId: string;
	email: string;
	role: string;
	oldRefreshToken: string;
}

export interface RequestToGuard extends Request {
	user: IRefreshToken;
}

export interface IPayload {
	userId: string;
	email: string;
	role: string;
}
