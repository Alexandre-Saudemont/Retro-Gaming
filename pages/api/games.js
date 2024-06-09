import axios from 'axios';

export async function fetchGamesGamecube(platformId, limit = 20) {
	try {
		const response = await axios.get(
			`https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_API_RAWG}&platforms=${platformId}&page_size=${limit}`,
		);
		return response.data.results;
	} catch (error) {
		console.error('Error fetching games data:', error);
		throw error;
	}
}
