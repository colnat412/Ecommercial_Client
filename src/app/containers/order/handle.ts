import { BE_URL } from "@/env";
import axios from "axios";

export const getOrder = async () => {
    const { data } = await axios.get(BE_URL+'/orders');
    return data;
}