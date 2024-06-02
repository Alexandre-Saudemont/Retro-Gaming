import axios from 'axios';

export async function fetchGamesGamecube(limit = 20) {
	try {
		const response = await axios.get('https://api.rawg.io/api/platforms?key=3972ca1596c142ad97bb9ed402fe6127&limit=${limit}');
		return response.data.results;
	} catch (error) {
		console.error('Error fetching games data:', error);
		throw error;
	}
}
