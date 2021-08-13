import React from 'react';
import EventEmitter from 'eventemitter3';
import { Room } from 'twilio-video';
declare class RoomRegistry extends EventEmitter<{
    roomRegistered: [Room];
}> {
    room?: Room;
    registerVideoRoom(room: Room): void;
}
export declare const roomRegistry: RoomRegistry;
export declare const RoomContext: React.Context<Room | undefined>;
export default function RoomProvider({ children }: {
    children: React.ReactNode;
}): JSX.Element;
export {};
