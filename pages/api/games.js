import axios from 'axios';

export async function fetchGamesGamecube(platformId, page = 1, limit = 20) {
	try {
		const response = await axios.get(`https://api.rawg.io/api/games`, {
			params: {
				key: process.env.NEXT_PUBLIC_API_RAWG,
				platforms: platformId,
				page: page,
				page_size: limit,
			},
		});
		return response.data.results;
	} catch (error) {
		console.error('Error fetching games data:', error);
		throw error;
	}
}
