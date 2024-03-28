import { describe } from 'vitest';
import { NameSpace, RequestStatus } from '../../const';
import { getSimilar, getSimilarFetchingStatus } from './similar-data.selectors';

describe('SimilarData selectors', () => {
  const state = {
    [NameSpace.Similar]: {
      similar: [],
      fetchingStatus: RequestStatus.Success,
    },
  };
  it('should return similar from state', () => {
    const { similar } = state[NameSpace.Similar];
    const result = getSimilar(state);
    expect(result).toEqual(similar);
  });
  it('should return fetchingStatus from state', () => {
    const { fetchingStatus } = state[NameSpace.Similar];
    const result = getSimilarFetchingStatus(state);
    expect(result).toEqual(fetchingStatus);
  });
});
