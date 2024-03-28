import { describe } from 'vitest';
import { RequestStatus } from '../../const';
import { makeFakePromos } from '../../utils/mocks';
import { fetchPromos } from '../api-actions';
import { promosData } from './promos-data.slice';

describe('PromosData slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {
      type: '',
    };
    const expectedState = {
      promos: [],
      fetchingStatus: RequestStatus.Idle,
    };

    const result = promosData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {
      type: '',
    };
    const expectedState = {
      promos: [],
      fetchingStatus: RequestStatus.Idle,
    };

    const result = promosData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "promos" to array with promo, fetchingStatus to success with "fetchPromos.fulfilled"', () => {
    const mockPromos = makeFakePromos();
    const expectedState = {
      promos: mockPromos,
      fetchingStatus: RequestStatus.Success,
    };

    const result = promosData.reducer(
      undefined,
      fetchPromos.fulfilled(mockPromos, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set fetchingStatus to rejected with "fetchPromos.rejected"', () => {
    const expectedState = {
      promos: [],
      fetchingStatus: RequestStatus.Rejected,
    };

    const result = promosData.reducer(undefined, fetchPromos.rejected);

    expect(result).toEqual(expectedState);
  });
});
