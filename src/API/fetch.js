import 'regenerator-runtime/runtime';
import { sortOwls } from '../helpers';

const gameID = 'mdFQJuniXYEZdkJargKX';

const createGame = async () => {
  const response = await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games',
    {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'Flappy owl' }),
    },
  );

  const responseObj = await response.json();
  const game = responseObj.result;
  return game;
};

const uploadGameData = async (owlName, owlScore) => {
  const data = {
    user: owlName,
    score: owlScore,
  };

  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/`;
  const response = await fetch(url, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const responseObj = response.json();
  return responseObj;
};

const getGameData = async () => {
  try {
    const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/`;
    const response = await fetch(url);
    const responseObj = await response.json();
    return sortOwls(responseObj.result);
  } catch (error) {
    throw Error('No data found');
  }
};

export {
  getGameData,
  uploadGameData,
  createGame,
};