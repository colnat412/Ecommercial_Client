import { api} from '@/src/libs';

export const favoriteDelete = async (
	id: string
) => {
	try {
		const request = await api.delete(`/products/${id}`);
		if (request.status === 200) {
            return true;
		}
        return false;
	} catch (err) {
		console.log(err);
        return false;
	}
};
