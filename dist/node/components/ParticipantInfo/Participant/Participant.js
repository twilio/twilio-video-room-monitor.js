"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Participant = void 0;
const react_1 = __importDefault(require("react"));
const Accordion_1 = require("../../typography/common/Accordion/Accordion");
const Datum_1 = __importDefault(require("../../typography/common/Datum/Datum"));
const useParticipantNetworkQualityLevel_1 = __importDefault(require("../../../hooks/useParticipantNetworkQualityLevel/useParticipantNetworkQualityLevel"));
const useParticipantIsReconnecting_1 = __importDefault(require("../../../hooks/useParticipantIsReconnecting/useParticipantIsReconnecting"));
const usePublications_1 = __importDefault(require("../../../hooks/usePublications/usePublications"));
const VideoTrackPublicationInfo_1 = require("../VideoTrackPublicationInfo/VideoTrackPublicationInfo");
const AudioTrackPublicationInfo_1 = require("../AudioTrackPublicationInfo/AudioTrackPublicationInfo");
const DataTrackPublicationInfo_1 = require("../DataTrackPublicationInfo/DataTrackPublicationInfo");
const Participant = ({ participant, isLocal }) => {
    const networkQualityLevel = (0, useParticipantNetworkQualityLevel_1.default)(participant);
    const isReconnecting = (0, useParticipantIsReconnecting_1.default)(participant);
    const publications = (0, usePublications_1.default)(participant, isLocal);
    const dataTrackPublications = publications.filter((publication) => publication.kind === 'data');
    const audioTrackPublications = publications.filter((publication) => publication.kind === 'audio');
    const videoTrackPublications = publications.filter((publication) => publication.kind === 'video');
    return (react_1.default.createElement(Accordion_1.Accordion, { label: participant.identity },
        react_1.default.createElement(Datum_1.default, { label: "SID", value: participant.sid }),
        react_1.default.createElement(Datum_1.default, { label: "isReconnecting", value: isReconnecting }),
        react_1.default.createElement(Datum_1.default, { label: "networkQualityLevel", value: networkQualityLevel }),
        react_1.default.createElement(Accordion_1.Accordion, { label: `Data Tracks (${dataTrackPublications.length})` }, dataTrackPublications.map((dataTrackPublication) => (react_1.default.createElement(DataTrackPublicationInfo_1.DataTrackPublicationInfo, { key: dataTrackPublication.trackSid, publication: dataTrackPublication })))),
        react_1.default.createElement(Accordion_1.Accordion, { label: `Audio Tracks (${audioTrackPublications.length})` }, audioTrackPublications.map((audioTrackPublication) => (react_1.default.createElement(AudioTrackPublicationInfo_1.AudioTrackPublicationInfo, { key: audioTrackPublication.trackSid, publication: audioTrackPublication })))),
        react_1.default.createElement(Accordion_1.Accordion, { label: `Video Tracks (${videoTrackPublications.length})` }, videoTrackPublications.map((videoTrackPublication) => (react_1.default.createElement(VideoTrackPublicationInfo_1.VideoTrackPublicationInfo, { key: videoTrackPublication.trackSid, publication: videoTrackPublication }))))));
};
exports.Participant = Participant;
