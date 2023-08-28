const base_url = process.env.REACT_APP_API_KEY;

export const apiCallRequest = async (path, method, requestPayload) => {
  const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
  const response = await fetch(base_url + path, {
    method,
    headers: headers,
    body: requestPayload ? JSON.stringify(requestPayload) : null,
  });
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    return response;
  }
};