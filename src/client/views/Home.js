import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionUpdateStore } from '../redux/actions';
import { FetchData } from '../api';
import { Content, Header } from '../components';

const socketUrl = 'wss://hometask.eg1236.com/game1/';
const socket = new WebSocket(socketUrl);
const initialState = { x: 0, y: 0 };
const initNewGame = () => {
  socket.onopen = function() {
    socket.send('new 1');
  };
  socket.onmessage = function(e) {
    console.log('data: ', e.data);
  };
};

export function Home({ updateStore }) {
  const [coordinates, setCoordinates] = useState(initialState);

  useEffect(() => {
    initNewGame();
  }, []);

  useEffect(() => {
    FetchData.getLatestData().then(res => {
      updateStore(res);
    });
  }, [updateStore]);

  const getInfoFromSocket = () => {
    console.log('to socket sent with coordinates: ', coordinates);
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
    <div className="home">
      <Header />
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
      <p>
        Coordinates - <span>x: {coordinates.x}</span> <span>y: {coordinates.y}</span>
      </p>
      <button onClick={getInfoFromSocket}>get info from socket</button>
      <button onClick={() => initNewGame()}>New Game</button>
      <Content />
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    updateStore: bindActionCreators(actionUpdateStore, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Home);
