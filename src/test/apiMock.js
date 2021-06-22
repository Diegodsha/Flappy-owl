const fetchCall = (url, params) => params.method + url;

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/mdFQJuniXYEZdkJargKX/scores/';

const params = {
  mode: 'cors',
  headers: { 'Content-Type': 'application/json' },
};

const mockLeaderBoard = {
  result: [
    {
      user: 'Shrek',
      score: 2,
    },
    {
      user: 'Invincible',
      score: 35,
    },
    {
      user: 'Homelander',
      score: 10,
    },
  ],
};

export {
  fetchCall,
  url,
  params,
  mockLeaderBoard,
};