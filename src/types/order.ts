import { Product } from './product';

export interface Order {
	id: string;
	order_date: string;
	total_price: number;
	itemCount: number;
	isActive: boolean;
}
