import { BE_URL } from "@/env";
import { api } from "@/src/libs";
import { DetailInfomation, Product } from "@/src/types";
export const fetchDetailInformation = async () => {
    try{
        const response = await api.get(
				`${BE_URL}/detailInfomations/6ef1a79a-ba34-4ff2-8b53-d0fe813eae45`,
			);
        const data: DetailInfomation = await response.data;
        return {
            data: data,
            status: response.status,
            message: response.statusText
        }
    }
    catch(err){
        console.log(err);
        return {
            data: null,
            status: 500,
            message: "Internal Server Error"
        }
    }
};

export const fetchFavorite = async () => {
    try{
        const response = await api.get(`${BE_URL}/products`);
        const data: Product[] = await response.data;
        return {
            data: data,
            status: response.status,
            message: response.statusText
        }
    }
    catch(err){
        console.log(err);
        return {
            data: null,
            status: 500,
            message: "Internal Server Error"
        }
    }
}