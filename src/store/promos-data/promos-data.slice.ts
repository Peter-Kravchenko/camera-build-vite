import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { TPromosData } from '../../types/state';
import { fetchPromos } from '../api-actions';

const initialState: TPromosData = {
  promos: [],
  fetchingStatus: RequestStatus.Idle,
};

export const promoData = createSlice({
  name: NameSpace.Promos,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromos.pending, (state) => {
        state.fetchingStatus = RequestStatus.Pending;
      })
      .addCase(fetchPromos.fulfilled, (state, action) => {
        state.promos = action.payload;
        state.fetchingStatus = RequestStatus.Success;
      })
      .addCase(fetchPromos.rejected, (state) => {
        state.fetchingStatus = RequestStatus.Rejected;
      });
  },
});
