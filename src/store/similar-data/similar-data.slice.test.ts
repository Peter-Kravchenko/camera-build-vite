import { describe } from 'vitest';
import { RequestStatus } from '../../const';
import { makeFakeCamera, makeFakeCameras } from '../../utils/mocks';
import { fetchSimilar } from '../api-actions';
import { similarData } from './similar-data.slice';

describe('SimilarData slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {
      type: '',
    };
    const expectedState = {
      similar: [],
      fetchingStatus: RequestStatus.Idle,
    };

    const result = similarData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {
      type: '',
    };
    const expectedState = {
      similar: [],
      fetchingStatus: RequestStatus.Idle,
    };

    const result = similarData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set fetchingStatus to success with "fetchSimilar.fulfilled"', () => {
    const mockSimilar = makeFakeCameras();
    const id = makeFakeCamera().id;
    const expectedState = {
      similar: mockSimilar,
      fetchingStatus: RequestStatus.Success,
    };

    const result = similarData.reducer(
      undefined,
      fetchSimilar.fulfilled(mockSimilar, '', id)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set fetchingStatus to rejected with "fetchSimilar.rejected"', () => {
    const expectedState = {
      similar: [],
      fetchingStatus: RequestStatus.Rejected,
    };

    const result = similarData.reducer(undefined, fetchSimilar.rejected);

    expect(result).toEqual(expectedState);
  });
});
