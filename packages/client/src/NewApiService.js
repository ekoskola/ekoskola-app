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

  /**
   *
   * @param {object} params
   * @returns {array} games list or empty list
   */
  async getGames(params = {}) {
    // const data = await this.getGraphQlData('games', params, this.gameFields);
    // return data.games;
  }

  /**
   *
   * @param {object} params
   * @returns {array} games game by id
   */
  async getGameById(params = {}) {
    // const data = await this.getGraphQlData('game', params, this.gameFields);
    // return data.game;
  }

  async addGame(params) {
    // const data = await this.mutateGraphQlData('addGame', params, this.gameFields);
    // return data.addGame;
  }
}

export default new ApiService();
