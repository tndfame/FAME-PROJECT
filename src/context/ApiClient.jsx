import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7276/api/',
  timeout: 100000,
});

const makeRequest = async (methodData, url, data) => {
  const config = {
    method: `${methodData}`,
    url: url,
    headers: {  
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: data,  
  };

  try {
    const response = await api(config);
    return response;
  } catch (error) {
    console.error('Error:', error);
    return error;
  }
};

export const getAsync = (url, params = null) => {
  return makeRequest("get", url, params);
};

export const postAsync = (url, data) => {
  console.log(url);
  console.log(data);
  return makeRequest("post", url, data);
};

export const putData = (url, data) => {
  return makeRequest("put", url, data);
};

export const deleteData = (url) => {
  return makeRequest("delete", url);
};
