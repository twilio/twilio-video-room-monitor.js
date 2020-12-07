import React from 'react';
import AppContainer from './components/AppContainer/AppContainer';
import RoomInfo from './components/RoomInfo/RoomInfo';
import RoomProvider from './components/RoomProvider/RoomProvider';

export default function App() {
  return (
    <RoomProvider>
      <AppContainer>
        <RoomInfo />
      </AppContainer>
    </RoomProvider>
  );
}
