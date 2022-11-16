import ApiService from '../ApiService';

export default {
  async login(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await ApiService.login(payload);
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
