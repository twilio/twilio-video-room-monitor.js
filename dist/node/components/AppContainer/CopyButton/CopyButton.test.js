"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const CopyButton_1 = require("./CopyButton");
const useRoom_1 = __importDefault(require("../../../hooks/useRoom/useRoom"));
Object.assign(navigator, { clipboard: { writeText: jest.fn().mockImplementation(() => Promise.resolve()) } });
const mockWriteText = navigator.clipboard.writeText;
jest.mock('../../../hooks/useRoom/useRoom');
const mockUseRoom = useRoom_1.default;
mockUseRoom.mockImplementation(() => ({
    name: 'test123',
    sid: 'XXXXXXXXXXXXX1234',
    mediaRegion: 'testRegion',
    localParticipant: {
        audioTracks: { kind: 'audio', processor: null },
        videoTracks: { kind: 'video', processor: { kind: 'processor' } },
        tracks: {
            audio: { kind: 'audio', processor: null },
            video: { kind: 'video', processor: { kind: 'processor' } },
        },
    },
    _options: {
        name: 'test',
        tracks: {
            audio: { kind: 'audioOptions', processor: null },
            video: { kind: 'videoOptions', processor: { kind: 'Options' } },
        },
    },
}));
describe('the CopyButton component', () => {
    it('should display different text when the button is clicked', (done) => {
        const wrapper = enzyme_1.shallow(react_1.default.createElement(CopyButton_1.CopyButton, null));
        expect(wrapper.find(CopyButton_1.Tooltip).text()).toBe('Copy Room Information');
        wrapper.find(CopyButton_1.CopyButtonContainer).simulate('click');
        setImmediate(() => {
            expect(wrapper.find(CopyButton_1.Tooltip).text()).toBe('Room information copied to clipboard');
            wrapper.find(CopyButton_1.CopyButtonContainer).simulate('mouseleave');
            expect(wrapper.find(CopyButton_1.Tooltip).contains('Copy Room Information')).toBe(true);
            done();
        });
    });
    it('should change the processor values to booleans for the room object when clicked', () => {
        const wrapper = enzyme_1.shallow(react_1.default.createElement(CopyButton_1.CopyButton, null));
        wrapper.find(CopyButton_1.CopyButtonContainer).simulate('click');
        expect(mockWriteText.mock.calls[0][0]).toMatchInlineSnapshot(`
      "{
        \\"name\\": \\"test123\\",
        \\"sid\\": \\"XXXXXXXXXXXXX1234\\",
        \\"mediaRegion\\": \\"testRegion\\",
        \\"localParticipant\\": {
          \\"audioTracks\\": {
            \\"kind\\": \\"audio\\",
            \\"processor\\": false
          },
          \\"videoTracks\\": {
            \\"kind\\": \\"video\\",
            \\"processor\\": true
          },
          \\"tracks\\": {
            \\"audio\\": {
              \\"kind\\": \\"audio\\",
              \\"processor\\": false
            },
            \\"video\\": {
              \\"kind\\": \\"video\\",
              \\"processor\\": true
            }
          }
        },
        \\"_options\\": {
          \\"name\\": \\"test\\",
          \\"tracks\\": {
            \\"audio\\": {
              \\"kind\\": \\"audioOptions\\",
              \\"processor\\": false
            },
            \\"video\\": {
              \\"kind\\": \\"videoOptions\\",
              \\"processor\\": true
            }
          }
        },
        \\"connectionOptions\\": {
          \\"name\\": \\"test\\",
          \\"tracks\\": {
            \\"audio\\": {
              \\"kind\\": \\"audioOptions\\",
              \\"processor\\": false
            },
            \\"video\\": {
              \\"kind\\": \\"videoOptions\\",
              \\"processor\\": true
            }
          }
        }
      }"
    `);
    });
});
