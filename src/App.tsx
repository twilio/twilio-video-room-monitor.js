import React from 'react';
import AppContainer from './components/AppContainer/AppContainer';
import ParticipantInfo from './components/ParticipantInfo/ParticipantInfo';
import RoomInfo from './components/RoomInfo/RoomInfo';
import RoomProvider from './components/RoomProvider/RoomProvider';
import RoomStatsProvider from './components/RoomStatsProvider/RoomStatsProvider';
import ReceiveBandwidthChart from './components/StatsCharts/ReceiveBandwidth/ReceiveBandwidthChart';

export default function App() {
  return (
    <RoomProvider>
      <RoomStatsProvider>
        <AppContainer>
          <RoomInfo />
          <ParticipantInfo />
          <ReceiveBandwidthChart />
        </AppContainer>
      </RoomStatsProvider>
    </RoomProvider>
  );
}
