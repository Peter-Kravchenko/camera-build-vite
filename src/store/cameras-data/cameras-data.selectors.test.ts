import { describe } from 'vitest';
import { NameSpace, RequestStatus } from '../../const';
import { makeFakeCameras } from '../../utils/mocks';
import { getCameras, getCamerasFetchingStatus } from './cameras-data.selectors';

describe('CamerasData selectors', () => {
  const mockCameras = makeFakeCameras();
  const state = {
    [NameSpace.Cameras]: {
      cameras: mockCameras,
      fetchingStatus: RequestStatus.Success,
    },
  };
  it('should return cameras from state', () => {
    const { cameras } = state[NameSpace.Cameras];
    const result = getCameras(state);
    expect(result).toEqual(cameras);
  });
  it('should return fetchingStatus from state', () => {
    const { fetchingStatus } = state[NameSpace.Cameras];
    const result = getCamerasFetchingStatus(state);
    expect(result).toEqual(fetchingStatus);
  });
});
