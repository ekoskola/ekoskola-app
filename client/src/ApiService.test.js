import ApiService from './ApiService';

const gamesMock = {
  data: {
    games: [
      {
        id: 1,
        user: { first_name: 'Tereza', last_name: 'Ekoskola' },
        title: 'delectus aut autem',
        description: 'test',
      },
      {
        id: 2,
        user: { first_name: 'Tereza', last_name: 'Ekoskola' },
        title: 'quis ut nam facilis',
        description: 'test',
      },
    ],
  },
};

window.fetch = jest
  .fn()
  .mockImplementationOnce(() => ({
    status: 200,
    ok: true,
    json: () =>
      new Promise((resolve, reject) => {
        resolve(gamesMock);
      }),
  }))
  .mockImplementationOnce(() => ({
    status: 500,
  }));

describe('ApiService', () => {
  describe('getGames', () => {
    it('should returns games', async () => {
      const res = await ApiService.getGames();
      expect(res).toEqual(gamesMock.data.games);
    });
  });
});
