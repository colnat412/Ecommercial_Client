export interface Account {
	id: string;
	email: string;
	username: string;
	password: string;
	refreshToken: string;
	accessToken: string;
}

// SECURITY: this is a fake token, replace this with your own token
// SECRET INTERFACE
