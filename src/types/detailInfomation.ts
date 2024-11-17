import { Feedback } from './feedback';

export interface DetailInfomation {
	fullName: string;
	address: string;
	phone: string;
	avatarUrl: string;
}

interface Order { 
	date: DateTime; 
	item: number;
	price: number
}