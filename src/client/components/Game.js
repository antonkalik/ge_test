import React, { useState } from 'react';
import { BlinkSymbol } from '.';

export default function Content({ socket, game }) {
  const [data, setData] = useState(null);

  socket.onmessage = function(e) {
    console.log('DATA: ', e.data);
    if (e.data.includes('map:')) {
      setData(e.data);
    }
  };

  const onClickField = async coordinates => {
    await socket.send(`open ${coordinates.x} ${coordinates.y}`);
    await socket.send('map');
  };

  const cells = data && data.split(/\n/).slice(1, -1);

  if (cells && cells.length < 10 && game) {
    return <p className="loader">loading{<BlinkSymbol symbol="." />}</p>;
  }

  return (
    <div className="game">
      {cells &&
        cells.map((it, y) => (
          <p key={y}>
            {[...it].map((s, x) => {
              return (
                <span
                  className={`box${s === '□' ? ' hide' : ''}`}
                  key={x}
                  onClick={() => onClickField({ x, y })}
                >
                  <span className="value">{s}</span>
                </span>
              );
            })}
          </p>
        ))}
    </div>
  );
}
