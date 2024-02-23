import { randomBytes } from "crypto";
const LENGTH_KEY = 30;

export const createSecretKeys = (): { privateKey: string; publicKey: string } => {
	return {
		privateKey: randomBytes(LENGTH_KEY).toString(),
		publicKey: randomBytes(LENGTH_KEY).toString(),
	};
};
