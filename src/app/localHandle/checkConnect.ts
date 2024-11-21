import { BE_URL } from "@/env";
import { api } from "@/src/libs";
import axios, { AxiosResponse } from "axios";

export const checkConnect = async () => {
    try{
        const response: AxiosResponse = await axios.get(`${BE_URL}/api`)
        return {
            status: response.status,
            message: response.statusText
        }
    }
    catch(err){
        console.log(err);
        return {
            status: 500,
            message: "Internal Server Error"
        }
    }
}