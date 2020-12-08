import { useEffect, useState } from 'react';
import useRoom from '../useRoom/useRoom';

export default function useIsRecording() {
  const room = useRoom();
  const [isRecording, setIsRecording] = useState(room?.isRecording || false);

  useEffect(() => {
    if (room) {
      setIsRecording(room.isRecording);

      const handleRecordingStarted = () => setIsRecording(true);
      const handleRecordingStopped = () => setIsRecording(false);

      room.on('recordingStarted', handleRecordingStarted);
      room.on('recordingStopped', handleRecordingStopped);

      return () => {
        room.off('recordingStarted', handleRecordingStarted);
        room.off('recordingStopped', handleRecordingStopped);
      };
    } else {
      setIsRecording(false);
    }
  }, [room]);

  return isRecording;
}
