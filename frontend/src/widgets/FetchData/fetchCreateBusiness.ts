import axios from 'axios';

export const createBusiness = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      'https://backendhackaton.onrender.com/business',
      { login: email, password: password }
    );

    if (response.status === 200) {
      console.log('Business created successfully');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error creating business:',
        error.response ? error.response.statusText : error.message
      );
    } else {
      console.error('Unexpected error:', error);
    }
  }
};
