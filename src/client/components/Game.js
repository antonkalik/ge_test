import React, { useEffect, useState } from 'react';

const url = 'wss://hometask.eg1236.com/game1/';
const initialState = { x: 0, y: 0 };

export default function Content({ game }) {
  const [coordinates, setCoordinates] = useState(initialState);
  const [data, setData] = useState(null);
  const socket = new WebSocket(url);

  useEffect(() => {
    console.log('Init game', game);

    socket.onopen = function() {
      socket.send('new ' + game);
      socket.send(`open ${coordinates.x} ${coordinates.y}`);
      socket.send('map');
    };
    socket.onmessage = function(e) {
      setData(e.data);
    };
    socket.onclose = () => {
      socket.close();
    };
  }, [game]);

  const getInfoFromSocket = () => {
    socket.send(`open ${coordinates.x} ${coordinates.y}`);
  };

  const onChangeCoordinates = (axis, value) => {
    setCoordinates({
      ...coordinates,
      [axis]: parseInt(value),
    });
  };

  return (
    <div className="game">
      <h2>Game</h2>
      {data && (
        <div>
          {data
            .split(/\n/)
            .slice(1, -1)
            .map((it, y) => (
              <p key={y}>
                {[...it].map((s, x) => {
                  return (
                    <span
                      key={x}
                      onClick={() => {
                        console.log({ x, y });
                      }}
                    >
                      {s}
                    </span>
                  );
                })}
              </p>
            ))}
        </div>
      )}
      <p>
        Coordinates - <span>x: {coordinates.x}</span> <span>y: {coordinates.y}</span>
      </p>
      <button onClick={getInfoFromSocket}>get info from socket</button>

      <p>
        {['x', 'y'].map(axis => (
          <span key={axis}>
            {axis}:{' '}
            <select onChange={({ target: { value } }) => onChangeCoordinates(axis, value)}>
              {[...Array(10).keys()].map(n => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </span>
        ))}
      </p>
    </div>
  );
}
