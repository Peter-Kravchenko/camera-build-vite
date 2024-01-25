import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { TPromoData } from '../../types/state';
import { fetchPromo } from '../api-actions';

const initialState: TPromoData = {
  promo: [],
  fetchingStatus: RequestStatus.Idle,
};

export const promoData = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromo.pending, (state) => {
        state.fetchingStatus = RequestStatus.Pending;
      })
      .addCase(fetchPromo.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.fetchingStatus = RequestStatus.Success;
      })
      .addCase(fetchPromo.rejected, (state) => {
        state.fetchingStatus = RequestStatus.Rejected;
      });
  },
});
