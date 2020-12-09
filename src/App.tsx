import React from 'react';
import AppContainer from './components/AppContainer/AppContainer';
import RoomInfo from './components/RoomInfo/RoomInfo';
import RoomProvider from './components/RoomProvider/RoomProvider';
import RoomStatsProvider from './components/RoomStatsProvider/RoomStatsProvider';
import Plot from './components/StatsCharts/StatsCharts';

export default function App() {
  return (
    <RoomProvider>
      <RoomStatsProvider>
        <AppContainer>
          <RoomInfo />
          <Plot />
        </AppContainer>
      </RoomStatsProvider>
    </RoomProvider>
  );
}
