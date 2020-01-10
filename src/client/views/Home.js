import React, { useState } from 'react';
import { Game } from '../components';

export function Home() {
  const [gameNumber, setGameNumber] = useState('1');
  const [game, setGame] = useState('');

  return (
    <div className="home">
      <div>
        {game < 1 ? (
          <span>
            <select
              onChange={({ target: { value } }) => {
                setGameNumber(value);
              }}
            >
              {[...Array(4).keys()].map(g => (
                <option key={g} value={g + 1}>
                  {g + 1}
                </option>
              ))}
            </select>
            <button onClick={() => setGame(gameNumber)}>New Game</button>
          </span>
        ) : (
          <button
            onClick={() => {
              setGame('');
            }}
          >
            Close
          </button>
        )}
      </div>

      {game > 0 && <Game game={game} />}
    </div>
  );
}

export default Home;
