import React, { useEffect, useState } from 'react';

const socketUrl = 'wss://hometask.eg1236.com/game1/';
const socket = new WebSocket(socketUrl);
const initialState = { x: 0, y: 0 };

export default function Content({ game }) {
  const [coordinates, setCoordinates] = useState(initialState);

  useEffect(() => {
    socket.onopen = function() {
      socket.send('new 1');
    };
    socket.onmessage = function(e) {
      console.log('data: ', e.data);
    };
  }, [game]);

  const getInfoFromSocket = () => {
    socket.send(`open ${coordinates.x} ${coordinates.y}`);
    socket.send('map');
  };

  const onChangeCoordinates = (axis, value) => {
    setCoordinates({
      ...coordinates,
      [axis]: parseInt(value),
    });
  };

  return (
    <div>
      <h2>Game</h2>

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
