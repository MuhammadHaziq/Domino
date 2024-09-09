import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '../../NavigationService';

const instance = axios.create({
  baseURL: '',
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

instance.interceptors.response.use(
  async (response) => {
    // token expired.  Try to refresh it once.
    if (response.data.code === 401) {
      if (!response.config_retry) {
        response.config._retry = true;
        const refreshToken = await AsyncStorage.getItem('refresh_token');

        return instance
          .post('', {
            refresh_token: refreshToken,
          })
          .then(async (res) => {
            if (res.status === 200) {
              await AsyncStorage.setItem('token', res.data.access_token);
              await AsyncStorage.setItem(
                'refresh_token',
                res.data.refresh_token,
              );
              // refreshed token, try api call again
              instance.defaults.headers.common['Authorization'] =
                'Bearer ' + res.data.access_token;
              return instance(response.config);
            } else {
              return Promise.reject();
            }
          });
      } else {
        return Promise.reject();
      }
    }
    return response;
  },
  async (error) => {
    if (
      error.config.url.includes('register-user') ||
      error.config.url.includes('create')
    ) {
      return new Promise((resolve, reject) => {
        resolve(error.response);
      });
    }

    if (!error.config_retry) {
      error.config._retry = true;
      const refreshToken = await AsyncStorage.getItem('refresh_token');

      return instance
        .post('', {
          refresh_token: refreshToken,
        })
        .then(async (res) => {
          if (res.status === 200) {
            await AsyncStorage.setItem('token', res.data.access_token);
            await AsyncStorage.setItem('refresh_token', res.data.refresh_token);
            // refreshed token, try api call again
            instance.defaults.headers.common['Authorization'] =
              'Bearer ' + res.data.access_token;
            return instance(response.config);
          } else {
            return Promise.reject();
          }
        });
    } else {
      return Promise.reject();
    }

    // refresh token has expired
    NavigationService.navigate('Welcome');
    return Promise.reject(error);
  },
);

export default instance;
