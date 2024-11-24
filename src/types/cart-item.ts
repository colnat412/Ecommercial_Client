import { Option } from './option';
import { Product } from './product';

export interface CartItem {
	id: string;
	quantity: number;
	item: Product;
}
