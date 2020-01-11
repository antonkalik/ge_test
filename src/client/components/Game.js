import React, { useState } from 'react';
import { BlinkSymbol, Box } from '.';

export default function Content({ socket, game }) {
  const [data, setData] = useState(null);

  socket.onmessage = function(e) {
    console.log('DATA: ', e.data);
    if (e.data.includes('map:')) {
      setData(e.data);
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
