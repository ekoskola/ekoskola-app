import ApiService from '../ApiService';

export default {
  async login(payload) {
    console.log('login');
    console.log('payload', payload);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await ApiService.login(payload);
        console.log('res', res);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  },
  async authenticate() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await ApiService.auth();
        console.log('res', res);
        resolve(res);
      } catch (error) {
        reject(error.message);
      }
    });
  },
  async logout() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await ApiService.logout();
        resolve(res);
      } catch (error) {
        reject(error.message);
      }
    });
  },
};
