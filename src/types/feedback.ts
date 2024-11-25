import { Account } from './account';
import { DetailInformation } from './detailInfomation';

export interface Feedback {
	id: string;
	productId: string;
	imageUrl: string;
	rating: number;
	comment: string;
	detailInfomation: DetailInformation;
	createdAt?: string;
	updatedAt?: string;
}

export interface FeedbackProductDetail extends Feedback {
	account: {
		detailInformation: DetailInformation;
	} & Account;
}