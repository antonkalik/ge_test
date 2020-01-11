import React, { useState, useEffect } from 'react';
import { BlinkSymbol, Box } from './index';

// first lvl. You win. The password for this level is: ThisWasEasy

export default function Content({ socket, game }) {
  const [data, setData] = useState(null);
  const [gameResult, setGameResult] = useState(null);

  useEffect(() => {
    setGameResult(null);
  }, [game]);

  socket.onmessage = function(e) {
    if (e.data.includes('map:')) {
      setData(e.data);
    } else {
      game && setGameResult(e.data);
    }
  };

  const onClickField = ({ x, y }) => {
    socket.send(`open ${x} ${y}`);
    socket.send('map');
  };

  const cells = data && data.split(/\n/).slice(1, -1);

  if (cells && cells.length < 10 && game) {
    return <p className="loader">loading{<BlinkSymbol symbol="." />}</p>;
  }

  return (
    <div className="game">
      {<h2>{gameResult}</h2>}
      {cells &&
        cells.map((it, y) => (
          <p key={y}>
            {[...it].map((box, x) => {
              const props = { key: x, box, x, y, onClickField };
              return <Box {...props} />;
            })}
          </p>
        ))}
    </div>
  );
}
