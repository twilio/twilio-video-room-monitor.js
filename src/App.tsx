import React from 'react';
import AppContainer from './components/AppContainer/AppContainer';
import ParticipantInfo from './components/ParticipantInfo/ParticipantInfo';
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
          <ParticipantInfo />
          <Plot />
        </AppContainer>
      </RoomStatsProvider>
    </RoomProvider>
  );
}
