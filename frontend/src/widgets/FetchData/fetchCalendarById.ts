import axios from 'axios';

export default async function FetchCalendarById(calendarId: string | null) {
  try {
    const response = await axios.get(
      `https://backendhackaton.onrender.com/calendar/${calendarId}`
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
