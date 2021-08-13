import EventEmitter from 'eventemitter3';
import { Room } from 'twilio-video';
declare class VideoRoomMonitorImpl extends EventEmitter<{
    opened: [];
    closed: [];
}> {
    get isOpen(): boolean;
    openMonitor(): void;
    closeMonitor(): void;
    toggleMonitor(): void;
    registerVideoRoom(room: Room): void;
}
export declare const VideoRoomMonitor: VideoRoomMonitorImpl;
export {};
