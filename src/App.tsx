import React from 'react';
import AppContainer from './components/AppContainer/AppContainer';
import ParticipantInfo from './components/ParticipantInfo/ParticipantInfo';
import RoomInfo from './components/RoomInfo/RoomInfo';
import RoomProvider from './components/RoomProvider/RoomProvider';
import RoomStatsProvider from './components/RoomStatsProvider/RoomStatsProvider';
import ReceiveBandwidthChart from './components/StatsCharts/ReceiveBandwidth/ReceiveBandwidthChart';
import SentBandwidthChart from './components/StatsCharts/SentBandwidthChart/SentBandwidthChart';

export default function App() {
  return (
    <RoomProvider>
      <RoomStatsProvider>
        <AppContainer>
          {(activeTab: string) => (
            <>
              {activeTab === 'info' && (
                <>
                  <RoomInfo />
                  <ParticipantInfo />
                </>
              )}
              {activeTab === 'stats' && (
                <>
                  <ReceiveBandwidthChart />
                  <SentBandwidthChart />
                </>
              )}
            </>
          )}
        </AppContainer>
      </RoomStatsProvider>
    </RoomProvider>
  );
}
