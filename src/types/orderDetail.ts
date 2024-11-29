import { Product } from "./product"

export interface OrderDetail {
	id: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	order_date: string;
	total_price: number;
	full_name: string;
	phone: string;
	address: string;
	account_id: string;
	orderItems: {
		id: string;
		isActive: boolean;
		createdAt: string;
		updatedAt: string;
		product_id: string;
		order_id: string;
		feedback_id: string;
		quantity: number;
		single_price: number;
		product_description: string;
		products: Product;
	}[];
}