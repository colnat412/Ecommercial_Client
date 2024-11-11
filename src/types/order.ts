import { Product } from './product';

export interface Order {
	date: string;
	total: number;
	status: string;
	products: Product[];
}
