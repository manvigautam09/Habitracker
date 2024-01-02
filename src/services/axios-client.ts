import Config from 'react-native-config';
import axios, {AxiosInstance, AxiosResponse} from 'axios';

// Create an instance of Axios with custom configuration
const axiosClient: AxiosInstance = axios.create({
  baseURL: Config.BASE_URL, // Replace with your API base URL
  timeout: 5000, // Set a timeout value in milliseconds
  headers: {
    'X-client-Header': 'dashpad-mobile',
    'Content-Type': 'application/json',
  },
});

// Interceptor for request
axiosClient.interceptors.request.use(
  async config => {
    // const accessToken = await useAccessToken.get();
    // const auth = accessToken ? `Bearer ${accessToken}` : '';
    // config.headers.setAuthorization(auth);
    return config;
  },
  (error: any) => {
    // Handle request error
    return Promise.reject(error);
  },
);

// Interceptor for response
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can modify the response data here
    return response;
  },
  (error: any) => {
    // Handle response error
    return Promise.reject(error);
  },
);

export default axiosClient;
