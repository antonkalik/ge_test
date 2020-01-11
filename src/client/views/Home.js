import React, { useEffect, useState } from 'react';
import { Game } from '../components';

const url = 'wss://hometask.eg1236.com/game1/';

export function Home() {
  const [gameNumber, setGameNumber] = useState('1');
  const socket = new WebSocket(url);
  const [game, setGame] = useState('');

  useEffect(() => {
    console.log('Init game', game);
    socket.onopen = function() {
      socket.send('new ' + game);
      socket.send('map');
    };
    socket.onclose = () => {
      socket.close();
    };
  }, [game]);

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

      {game > 0 && <Game socket={socket} />}
    </div>
  );
}

export default Home;
