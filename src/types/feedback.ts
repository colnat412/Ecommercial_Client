import { Account } from './account';
import { DetailInformation } from './detailInfomation';
import { Product, ProductFeedback } from './product';

export interface Feedback {
	id: string;
	product: Product;
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