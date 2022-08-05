"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const constants_1 = require("../../constants");
// Returns true when the two publication arrays contain all the same sids, in any order.
// This helps to prevent any updates when only the order of publications has chagned.
function arePublicationArraysEqual(arr1, arr2) {
    const sidString1 = arr1
        .map((p) => p.trackSid)
        .sort()
        .join('');
    const sidString2 = arr2
        .map((p) => p.trackSid)
        .sort()
        .join('');
    return sidString1 === sidString2;
}
function usePublications(participant, isLocal) {
    const [publications, setPublications] = (0, react_1.useState)([]);
    const intervalIdRef = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        // Local participants do not emit the 'trackUnpublished' event when a local track is unpublished.
        // Here we periodically check to see if the publications have changed, and we update the state when
        // they have changed.
        if (isLocal) {
            intervalIdRef.current = window.setInterval(() => {
                const newPublications = Array.from(participant.tracks.values());
                setPublications((oldPublications) => 
                // Returning the current state here does not trigger a re-render.
                arePublicationArraysEqual(oldPublications, newPublications) ? oldPublications : newPublications);
            }, constants_1.UPDATE_INTERVAL);
            return () => {
                window.clearInterval(intervalIdRef.current);
            };
        }
    }, [participant, isLocal]);
    (0, react_1.useEffect)(() => {
        // Reset the publications when the 'participant' variable changes.
        setPublications(Array.from(participant.tracks.values()));
        const publicationAdded = (publication) => setPublications((prevPublications) => [...prevPublications, publication]);
        const publicationRemoved = (publication) => setPublications((prevPublications) => prevPublications.filter((p) => p !== publication));
        participant.on('trackPublished', publicationAdded);
        participant.on('trackUnpublished', publicationRemoved);
        return () => {
            participant.off('trackPublished', publicationAdded);
            participant.off('trackUnpublished', publicationRemoved);
        };
    }, [participant]);
    return publications;
}
exports.default = usePublications;
