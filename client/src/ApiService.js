const axios = require('axios');

/**
 *
 * Service for calling GraphQL API server
 */
class ApiService {
  /**
   * define base url and field schemas here
   * @returns {ApiService}
   */
  constructor() {
    this.host = window.location.origin;
    this.apiUrl = `${this.host}/graphql`;
    this.gameFields = `{
      id,
      name,
      file_id,
      description,
      objetive_1,
      objetive_2,
      objetive_3,
      location,
      grade,
      topics,
      classes,
      subjects,
      ekoskola_steps,
      timing,
      physical_activity,
      number_teachers,
      count}`;
  }

  async update(formData, gameId) {
    const { data } = await axios.post(`/update/${gameId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  }

  async upload(formData) {
    const { data } = await axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  }

  async removeGame(gameId) {
    const { data } = await axios.post(`/remove/${gameId}`);

    return data;
  }

  async login({ username, password }) {
    const { data } = await axios.post(`${this.host}/login`, {
      username,
      password,
    });

    return data;
  }

  async logout() {
    const { data } = await axios.post(`${this.host}/logout`);

    return data;
  }

  async auth() {
    const res = await fetch(`${this.host}/auth`, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    });
    if (res.ok) {
      const body = await res.json();
      return body.data;
    } else {
      throw new Error(res.status);
    }
  }

  async mutateGraphQlData(method, params, fields) {
    const query = `mutation {${method}${this.paramsToString(
      params
    )} ${fields}}`;
    const res = await fetch(this.apiUrl, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify({ query }),
    });
    if (res.ok) {
      const body = await res.json();
      return body.data;
    } else {
      throw new Error(res.status);
    }
  }
  /**
   * Generic function to fetch data from server
   * @param {string} query
   * @returns {unresolved}
   */
  async getGraphQlData(resource, params, fields) {
    const query = `{${resource} ${this.paramsToString(params)} ${fields}}`;
    const res = await fetch(this.apiUrl, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify({ query }),
    });
    if (res.ok) {
      const body = await res.json();
      return body.data;
    } else {
      throw new Error(res.status);
    }
  }

  /**
   *
   * @param {object} params
   * @returns {array} games list or empty list
   */
  async getGames(params = {}) {
    const data = await this.getGraphQlData('games', params, this.gameFields);
    return data.games;
  }

  /**
   *
   * @param {object} params
   * @returns {array} games game by id
   */
  async getGameById(params = {}) {
    const data = await this.getGraphQlData('game', params, this.gameFields);
    return data.game;
  }

  async addGame(params) {
    const data = await this.mutateGraphQlData(
      'addGame',
      params,
      this.gameFields
    );
    return data.addGame;
  }

  /**
   *
   * @param {object} params
   * @returns {String} params converted to string for usage in graphQL
   */
  paramsToString(params) {
    let paramString = '';
    if (
      Object.prototype.toString.apply(params) === '[object Object]' &&
      Object.keys(params).length
    ) {
      let tmp = [];
      for (let key in params) {
        let paramStr = params[key];
        if (
          Object.prototype.toString.apply(paramStr) === '[object Array]' &&
          Object.keys(params).length
        ) {
          // Manage arrays to be valid graphql querys
          tmp.push(`${key}:${`["${paramStr.join('", "')}"]`}`);
        } else if (paramStr !== '') {
          if (typeof params[key] === 'string') {
            paramStr = `"${paramStr}"`;
          }
          tmp.push(`${key}:${paramStr}`);
        }
      }
      if (tmp.length) {
        paramString = `(${tmp.join()})`;
      }
    }
    return paramString;
  }
}

export default new ApiService();
