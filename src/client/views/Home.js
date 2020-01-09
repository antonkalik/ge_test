import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionUpdateStore } from '../redux/actions';
import { FetchData } from '../api';
import { Header, Content } from '../components';

const socketUrl = 'wss://hometask.eg1236.com/game1/';
const socket = new WebSocket(socketUrl);

export function Home({ updateStore }) {
  const [coordinates, setCoordinates] = useState([0, 0]);

  console.log({ coordinates });

  useEffect(() => {
    socket.onopen = function() {
      socket.send('new 1');
    };

    socket.onmessage = function(e) {
      console.log('data: ', e.data);
    };
  }, []);

  useEffect(() => {
    FetchData.getLatestData().then(res => {
      updateStore(res);
    });
  }, [updateStore]);

  const getInfoFromSocket = () => {
    socket.send('open 2 1');
    socket.send('map');
  };

  const getArrayAmount = amount => [...Array(amount).keys()];
  const onChangeCoordinates = (axis, value) => {
    console.log({ axis, value });
  };

  return (
    <div className="home">
      <Header />
      {getArrayAmount(2).map(axis => (
        <select key={axis} onChange={({ target: { value } }) => onChangeCoordinates(axis, value)}>
          {getArrayAmount(10).map(n => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      ))}

      <button onClick={getInfoFromSocket}>get info from socket</button>
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
