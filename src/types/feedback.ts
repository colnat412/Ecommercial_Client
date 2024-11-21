import { Account } from './account';
import { DetailInfomation } from './detailInfomation';

export interface Feedback {
	id: string;
	productId: string;
	imageUrl: string;
	rating: number;
	comment: string;
	detailInfomation: DetailInfomation;
	createdAt?: string;
	updatedAt?: string;
}