import { baseUrl, setLocalStorage } from "../utils";

export const fetchData = async (formData) => {
  const { userEmail, userPassword } = formData;
  const requestBody = {
    email: userEmail,
    password: userPassword,
  };

  try {
    const url = `${baseUrl}/api/v1/auth/sign_in`;

    // log request
    console.log('Request URL:', url);
    console.log('Request Body:', requestBody);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // log response
    console.log('Response Status:', response.status);

    // log response headers
    const headersArray = Array.from(response.headers.entries());
    const responseHeaders = Object.fromEntries(headersArray);
    console.log('Response Headers:', responseHeaders);

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error Response:', errorResponse);

      if (response.status === 404) {
        throw new Error('Page not found.');
      }
      if (response.status === 401) {
        setError('Invalid username or password.');
      }
      throw new Error(errorResponse.message);
    }

    const responseData = await response.json();
    setLocalStorage('response.headers', responseHeaders);      
    console.log('Response Data:', responseData);

    navigate('/c');
  } catch (error) {
    console.error(error);
  }
};