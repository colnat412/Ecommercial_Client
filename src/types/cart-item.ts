import { ListOption } from './listOption';
import { Option } from './option';
import { Product } from './product';

export interface CartItem {
	id: string;
	quantity: number;
	item: Product;
	listOption: string[];
}
