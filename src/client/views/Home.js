// import React, { useEffect, useState } from 'react';
// import { Content, Header } from '../components';
//
// const socketUrl = 'wss://hometask.eg1236.com/game1/';
// const socket = new WebSocket(socketUrl);
// const initialState = { x: 0, y: 0 };
//
// export function Home() {
//   const [coordinates, setCoordinates] = useState(initialState);
//
//   useEffect(() => {
//     socket.onopen = function() {
//       socket.send('new 1');
//     };
//     socket.onmessage = function(e) {
//       console.log('data: ', e.data);
//     };
//   }, []);
//
//   const getInfoFromSocket = () => {
//     socket.send(`open ${coordinates.x} ${coordinates.y}`);
//     socket.send('map');
//   };
//
//   const onChangeCoordinates = (axis, value) => {
//     setCoordinates({
//       ...coordinates,
//       [axis]: parseInt(value),
//     });
//   };
//
//   return (
//     <div className="home">
//       <Header />
//       <p>
//         {['x', 'y'].map(axis => (
//           <span key={axis}>
//             {axis}:{' '}
//             <select onChange={({ target: { value } }) => onChangeCoordinates(axis, value)}>
//               {[...Array(10).keys()].map(n => (
//                 <option key={n} value={n}>
//                   {n}
//                 </option>
//               ))}
//             </select>
//           </span>
//         ))}
//       </p>
//       <p>
//         Coordinates - <span>x: {coordinates.x}</span> <span>y: {coordinates.y}</span>
//       </p>
//       <button onClick={getInfoFromSocket}>get info from socket</button>
//       <Content />
//     </div>
//   );
// }
//
// export default Home;

import React, { useState } from 'react';
import { Game } from '../components';

export function Home() {
  const [game, setGame] = useState(0);

  return (
    <div className="home">
      <div>
        <select>
          {[...Array(4).keys()].map(g => (
            <option key={g} value={g}>
              {g + 1}
            </option>
          ))}
        </select>
        <button onClick={() => setGame(1)}>New Game</button>
        <button
          onClick={() => {
            setGame(0);
          }}
        >
          Close
        </button>
      </div>

      {game > 0 && <Game game={game} />}
    </div>
  );
}

export default Home;
