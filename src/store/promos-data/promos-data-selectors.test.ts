import { describe } from 'vitest';
import { NameSpace, RequestStatus } from '../../const';
import { makeFakePromos } from '../../utils/mocks';
import { getPromos, getPromosFetchingStatus } from './promos-data.selectors';

describe('PromosData selectors', () => {
  const mockPromos = makeFakePromos();
  const state = {
    [NameSpace.Promos]: {
      promos: mockPromos,
      fetchingStatus: RequestStatus.Success,
    },
  };
  it('should return promos from state', () => {
    const { promos } = state[NameSpace.Promos];
    const result = getPromos(state);
    expect(result).toEqual(promos);
  });
  it('should return fetchingStatus from state', () => {
    const { fetchingStatus } = state[NameSpace.Promos];
    const result = getPromosFetchingStatus(state);
    expect(result).toEqual(fetchingStatus);
  });
});
