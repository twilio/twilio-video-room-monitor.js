import React from 'react';
import Tracks from './Tracks';
import { shallow } from 'enzyme';

const mockMediaStreamTrack = {
  id: 'mockIdProp',
  muted: 'mockIsNotMutedProp',
  kind: 'mockKindProp',
  label: 'mockLabelProp',
  readyState: 'mockReadyStateProp',
};
const mockLocalTrack = {
  id: 'mockLocalId',
  kind: 'mockLocalKind',
  name: 'mockLocalName',
  mediaStreamTrack: mockMediaStreamTrack,
};

Object.defineProperty(window, 'MediaStreamTrack', {
  writable: false,
  value: jest.fn().mockImplementation((query) => ({
    id: '',
    muted: false,
    kind: '',
    label: '',
    readyState: '',
  })),
});

describe('the Tracks component', () => {
  describe('when there is no track', () => {
    it('should return a Datum component with a label when the track is undefined', () => {
      const wrapper = shallow(<Tracks tracks={undefined} />);
      expect(wrapper).toMatchInlineSnapshot(`
                <Memo(Datum)
                  label="Tracks"
                />
              `);
    });
    it('should return the Datum component with a null value when the track is null', () => {
      const wrapper = shallow(<Tracks tracks={null} />);
      expect(wrapper).toMatchInlineSnapshot(`
                <Memo(Datum)
                  label="Tracks"
                  value={null}
                />
              `);
    });
  });
  describe('when there are tracks in the array', () => {
    it('should return a MediaStreamTrack component for MediaStreamTrack objects', () => {
      const wrapper = shallow(<Tracks tracks={[mockMediaStreamTrack]} />);
      expect(wrapper).toMatchInlineSnapshot(`
        <Accordion
          label="Tracks"
        >
          <Memo(styled.div)>
            <Memo(Datum)
              label="Kind"
              value="mockKindProp"
            />
            <Memo(Datum)
              label="Name"
            />
            <Memo(Datum)
              label="ID"
              value="mockIdProp"
            />
            <Memo(MediaStreamTracks) />
          </Memo(styled.div)>
        </Accordion>
      `);
    });
    it('should return a container with properties for LocalTrack objects', () => {
      const wrapper = shallow(<Tracks tracks={[mockLocalTrack]} />);
      expect(wrapper).toMatchInlineSnapshot(`
        <Accordion
          label="Tracks"
        >
          <Memo(styled.div)>
            <Memo(Datum)
              label="Kind"
              value="mockLocalKind"
            />
            <Memo(Datum)
              label="Name"
              value="mockLocalName"
            />
            <Memo(Datum)
              label="ID"
              value="mockLocalId"
            />
            <Memo(MediaStreamTracks)
              track={
                Object {
                  "id": "mockIdProp",
                  "kind": "mockKindProp",
                  "label": "mockLabelProp",
                  "muted": "mockIsNotMutedProp",
                  "readyState": "mockReadyStateProp",
                }
              }
            />
          </Memo(styled.div)>
        </Accordion>
      `);
    });
  });
});
