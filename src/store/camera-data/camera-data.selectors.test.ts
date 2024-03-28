import { describe } from 'vitest';
import { NameSpace, RequestStatus } from '../../const';
import { makeFakeCamera } from '../../utils/mocks';
import { getCamera, getCameraFetchingStatus } from './camera-data.selectors';

describe('CameraData selectors', () => {
  const mockCamera = makeFakeCamera();
  const state = {
    [NameSpace.Camera]: {
      camera: mockCamera,
      fetchingStatus: RequestStatus.Success,
    },
  };
  it('should return camera from state', () => {
    const { camera } = state[NameSpace.Camera];
    const result = getCamera(state);
    expect(result).toEqual(camera);
  });
  it('should return fetchingStatus from state', () => {
    const { fetchingStatus } = state[NameSpace.Camera];
    const result = getCameraFetchingStatus(state);
    expect(result).toEqual(fetchingStatus);
  });
});
