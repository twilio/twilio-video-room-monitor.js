import React from 'react';
import AppContainer from './components/AppContainer/AppContainer';
import RoomInfo from './components/RoomInfo/RoomInfo';
import RoomProvider from './components/RoomProvider/RoomProvider';
import RoomStatsProvider from './components/RoomStatsProvider/RoomStatsProvider';

export default function App() {
  return (
    <RoomProvider>
      <RoomStatsProvider>
        <AppContainer>
          <RoomInfo />
        </AppContainer>
      </RoomStatsProvider>
    </RoomProvider>
  );
}
