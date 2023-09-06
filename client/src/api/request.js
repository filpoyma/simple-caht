import axios from "axios";

export const client = axios.create({
  baseURL: "/",
  withCredentials: true,
});

const request = (options) => {
  const onSuccess = function (response) {
    // console.log('Request Successful!', response);
    return response.data;
  };

  const onError = (error) => {
    // console.error('Request Failed:', error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      // console.log('Status:', error.response.status);
      // console.log('Data:', error.response.data);
      // console.log('Headers:', error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      // console.log('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
