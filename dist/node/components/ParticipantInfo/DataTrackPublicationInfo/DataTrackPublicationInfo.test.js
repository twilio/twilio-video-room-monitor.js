"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const DataTrackPublicationInfo_1 = require("./DataTrackPublicationInfo");
const useTrack_1 = __importDefault(require("../../../hooks/useTrack/useTrack"));
jest.mock('../../../hooks/useIsTrackEnabled/useIsTrackEnabled', () => () => true);
jest.mock('../../../hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff', () => () => true);
jest.mock('../../../hooks/useTrack/useTrack');
const mockUseTrack = useTrack_1.default;
mockUseTrack.mockImplementation(() => 'testTrack');
describe('the DataTrackInfo component', () => {
    describe('for LocalDataTrack objects', () => {
        it('should render correctly if a data track is present', () => {
            const wrapper = enzyme_1.shallow(react_1.default.createElement(DataTrackPublicationInfo_1.DataTrackInfo, { track: {} }));
            expect(wrapper).toMatchSnapshot();
        });
        it('should render correctly if there is no DataTrack data', () => {
            const wrapper = enzyme_1.shallow(react_1.default.createElement(DataTrackPublicationInfo_1.DataTrackInfo, { track: {} }));
            expect(wrapper.find({ isEnabled: true }).exists()).toBe(false);
        });
    });
    describe('for RemoteDataTrack objects', () => {
        it('should render correctly if a data track is present', () => {
            const wrapper = enzyme_1.shallow(react_1.default.createElement(DataTrackPublicationInfo_1.DataTrackInfo, { track: { isEnabled: true, isSwitchedOff: false } }));
            expect(wrapper).toMatchSnapshot();
        });
    });
});
describe('the DataTrackPublicationInfo component', () => {
    it('should render correctly', () => {
        const wrapper = enzyme_1.shallow(react_1.default.createElement(DataTrackPublicationInfo_1.DataTrackPublicationInfo, { publication: { trackName: 'testName' } }));
        expect(wrapper).toMatchSnapshot();
    });
    it('should not render the DataTrackInfo component if an data track is not present', () => {
        mockUseTrack.mockImplementationOnce(() => null);
        const wrapper = enzyme_1.shallow(react_1.default.createElement(DataTrackPublicationInfo_1.DataTrackPublicationInfo, { publication: { trackName: 'testName' } }));
        expect(wrapper.find(DataTrackPublicationInfo_1.DataTrackInfo).exists()).toBe(false);
    });
});
