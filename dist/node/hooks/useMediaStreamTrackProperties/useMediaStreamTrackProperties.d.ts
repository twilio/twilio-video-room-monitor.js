export default function useMediaStreamTrackProperties(mediaStreamTrack: MediaStreamTrack | undefined): {
    muted: boolean | undefined;
    readyState: "ended" | "live" | undefined;
    id: string | undefined;
    label: string | undefined;
    kind: string | undefined;
};
