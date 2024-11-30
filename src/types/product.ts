export interface Product {
	id: string;
	name: string;
	description: string;
	image_url: string;
	price: number;
	rating: number;
}

export interface ProductFeedback {
  createdAt: string;
  description: string;
  id: string;
  image_url: string;
  isActive: boolean;
  name: string;
  price: number;
  updatedAt: string;
}
