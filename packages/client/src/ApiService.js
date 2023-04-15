import axios from 'axios';

const createQueryString = json => {
  const params = new URLSearchParams();
  for (const key in json) {
    if (Array.isArray(json[key])) {
      json[key].forEach(value => params.append(`${key}[]`, value));
    } else {
      params.append(key, json[key]);
    }
  }
  return params.toString();
};

class ApiService {
  constructor() {
    this.host = 'http://localhost:8000';
    // this.host = window.origin;
    this.apiUrl = `${this.host}/api`;
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

  async getGames(filters) {
    console.log('filters', filters);
    const queryString = createQueryString(filters);
    console.log('queryString', queryString);

    const data = await axios.get(`${this.apiUrl}/game?${queryString}`);
    return data.data;
  }

  async getGameById(gameId) {
    console.log('gameId', gameId);
    const data = await axios.get(`${this.apiUrl}/game/${gameId}`);
    console.log('data game in ApiService', data.data);
    return data.data;
  }

  async voteGameById(gameId, rating) {
    const data = await axios.post(`${this.apiUrl}/game/${gameId}/vote`, {
      rating,
    });
    console.log('data voteGameById');
    return data.data;
  }

  async getUser({ username, password }) {}

  async addGame(params) {
    // const data = await this.mutateGraphQlData('addGame', params, this.gameFields);
    // return data.addGame;
  }
}

export default new ApiService();
