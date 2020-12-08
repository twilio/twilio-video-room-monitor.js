import { useContext } from 'react';
import { RoomContext } from '../../components/RoomProvider/RoomProvider';

export default function useRoom() {
  const context = useContext(RoomContext);
  return context;
}
