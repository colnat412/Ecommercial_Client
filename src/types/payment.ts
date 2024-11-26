export interface Payment {
	orderId: string;
	requestId: string;
	payUrl: string;
	shortLink: string;
	message: string;
	statusCode: number;
}
