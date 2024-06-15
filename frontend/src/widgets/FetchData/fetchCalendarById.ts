import axios from 'axios';

export default async function FetchCalendarById() {
  // TODO исправить на корректный запрос из slice
  const calendarInfo = 'ce621ee7-a6ef-45de-83bc-28ed1e90dfce';
  try {
    const response = await axios.get(
      `https://backendhackaton.onrender.com/calendar/${calendarInfo}`
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error sending reaction:',
        error.response ? error.response.statusText : error.message
      );
    } else {
      console.error('Unexpected error:', error);
    }
  }
}
