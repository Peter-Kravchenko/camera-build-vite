import { describe } from 'vitest';
import { RequestStatus } from '../../const';
import { makeFakeCamera } from '../../utils/mocks';
import { fetchCamera } from '../api-actions';
import { cameraData } from './camera-data.slice';

describe('CameraData slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {
      type: '',
    };
    const expectedState = {
      camera: null,
      fetchingStatus: RequestStatus.Idle,
    };

    const result = cameraData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {
      type: '',
    };
    const expectedState = {
      camera: null,
      fetchingStatus: RequestStatus.Idle,
    };

    const result = cameraData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "camera" to camera, fetchingStatus to success with "fetchCamera.fulfilled"', () => {
    const mockCamera = makeFakeCamera();
    const expectedState = {
      camera: mockCamera,
      fetchingStatus: RequestStatus.Success,
    };

    const result = cameraData.reducer(
      undefined,
      fetchCamera.fulfilled(mockCamera, '', mockCamera['id'])
    );

    expect(result).toEqual(expectedState);
  });

  it('should set fetchingStatus to rejected with "fetchCamera.rejected"', () => {
    const expectedState = {
      camera: null,
      fetchingStatus: RequestStatus.Rejected,
    };

    const result = cameraData.reducer(undefined, fetchCamera.rejected);

    expect(result).toEqual(expectedState);
  });
});
