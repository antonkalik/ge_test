import React, { useEffect, useState } from 'react';
import { Game } from '../components';

const url = 'wss://hometask.eg1236.com/game1/';

export function Home() {
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
      <Game socket={socket} />
      {game < 1 ? (
        <div className="game-chooser">
          <h2>Choose New Game</h2>
          {[...Array(4).keys()].map(g => (
            <button onClick={({ target: { value } }) => setGame(value)} key={g} value={g + 1}>
              {g + 1}
            </button>
          ))}
        </div>
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
  );
}

export default Home;
