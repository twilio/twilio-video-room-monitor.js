/// <reference types="react" />
import { Participant as ParticipantImpl } from 'twilio-video';
export declare const Participant: ({ participant, isLocal }: {
    participant: ParticipantImpl;
    isLocal?: boolean | undefined;
}) => JSX.Element;
