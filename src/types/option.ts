import { ListOption } from './listOption';

export interface Option {
	id: string;
	name: string;
	description: string;
	orderIndex: number;
	product_id: string;
	listOption: ListOption[];
}
