import React, { useState } from 'react';

export default function Content({ socket }) {
  const [data, setData] = useState(null);

  socket.onmessage = function(e) {
    console.log(e.data);
    setData(e.data);
  };

  const onClickField = async coordinates => {
    await socket.send(`open ${coordinates.x} ${coordinates.y}`);
    await socket.send('map');
  };

  return (
    <div className="game">
      {data &&
        data
          .split(/\n/)
          .slice(1, -1)
          .map((it, y) => (
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
