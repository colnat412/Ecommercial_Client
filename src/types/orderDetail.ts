import { Product } from "./product"

export interface OrderDetail {
    total: number,
    username: string,
    address: string,
    phone: string,
    products: {
        product: Product
        quantity: number
        price: number
        options: {
            listOption: {
                name: string
            }[]
        }
    }[]
}