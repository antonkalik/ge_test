import React, { useEffect, useState } from 'react';
import { Game } from '../components';

export function Home() {
  const socket = new WebSocket('wss://hometask.eg1236.com/game1/');
  const [game, setGame] = useState('');

  useEffect(() => {
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
      <Game socket={socket} game={game > 0} />
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
          style={{
            margin: '30px 0',
          }}
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
