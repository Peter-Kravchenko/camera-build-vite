import { describe } from 'vitest';
import { RequestStatus } from '../../const';
import { makeFakeCameras } from '../../utils/mocks';
import { fetchCameras } from '../api-actions';
import { camerasData } from './cameras-data.slice';

describe('CamersData slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {
      type: '',
    };
    const expectedState = {
      cameras: [],
      fetchingStatus: RequestStatus.Idle,
    };

    const result = camerasData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {
      type: '',
    };
    const expectedState = {
      cameras: [],
      fetchingStatus: RequestStatus.Idle,
    };

    const result = camerasData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('shoult set fetchingStatus to pending with "fetchCameras.pending"', () => {
    const expectedState = {
      cameras: [],
      fetchingStatus: RequestStatus.Pending,
    };

    const result = camerasData.reducer(undefined, fetchCameras.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "cameras" to array with camera, fetchingStatus to success with "fetchCameras.fulfilled"', () => {
    const mockCameras = makeFakeCameras();
    const expectedState = {
      cameras: mockCameras,
      fetchingStatus: RequestStatus.Success,
    };

    const result = camerasData.reducer(
      undefined,
      fetchCameras.fulfilled(mockCameras, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set fetchingStatus to rejected with "fetchCameras.rejected"', () => {
    const expectedState = {
      cameras: [],
      fetchingStatus: RequestStatus.Rejected,
    };

    const result = camerasData.reducer(undefined, fetchCameras.rejected);

    expect(result).toEqual(expectedState);
  });
});
