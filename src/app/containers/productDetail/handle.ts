import { BE_URL } from "@/env";
import { Feedback } from "@/src/types";
import axios from "axios";

export const getReviews = async (
     productId: string
) => {
     try {
          const response = await axios.get(
               `${BE_URL}/feedbacks`
          );
          const data: Feedback[] = response.data;
          console.log(data);
          return data;
     } catch (error) {
          console.error(error);
     }
};
