import * as apiMock from './apiMock';
import { sortOwls } from '../helpers';

describe('valid game created ', () => {
  const response = { result: 'Leaderboard score created correctly.' };

  const mockUpload = jest.fn().mockImplementation((url, params, name, scores) => {
    expect(url).toContain('mdFQJuniXYEZdkJargKX');

    params.method = 'POST';
    apiMock.fetchCall(url, params);

    const data = { user: name, score: scores };

    apiMock.mockLeaderBoard.result.push(data);

    return Promise.resolve({
      json: () => Promise.resolve(response),
    });
  });

  it("can submit a player's name and score ", () => mockUpload(apiMock.url, apiMock.params, 'UserName', 10)
    .then((response) => {
      const data = response.json();
      expect(data).toBeInstanceOf(Promise);
      expect(data).resolves.toHaveProperty('result', 'Leaderboard score created correctly.');
      expect(apiMock.mockLeaderBoard.result).toHaveLength(4);
    }));
});

describe('get the leaderboard from API call', () => {
  const unsorted = apiMock.mockLeaderBoard.result;
  const sortedBoard = sortOwls(unsorted.slice());

  const mockGetRankings = jest.fn().mockImplementation((url, params) => {
    expect(url).toContain('mdFQJuniXYEZdkJargKX');

    params.method = 'GET';

    apiMock.fetchCall(url, params);

    return Promise.resolve({
      json: () => Promise.resolve(sortedBoard),
    });
  });

  it('requests rankings from API service and returns them sorted', () => mockGetRankings(apiMock.url, apiMock.params)
    .then((response) => {
      expect(apiMock.params.method).toMatch('GET');
      const data = response.json();
      expect(data).resolves.not.toBe(unsorted);
      expect(data).resolves.toHaveLength(3);
    }));
});