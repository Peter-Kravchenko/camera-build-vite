import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { TSimilarData } from '../../types/state';
import { fetchSimilar } from '../api-actions';

const initialState: TSimilarData = {
  similar: [],
  fetchingStatus: RequestStatus.Idle,
};

export const similarData = createSlice({
  name: NameSpace.Similar,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSimilar.pending, (state) => {
        state.fetchingStatus = RequestStatus.Pending;
      })
      .addCase(fetchSimilar.fulfilled, (state, action) => {
        state.similar = action.payload;
        state.fetchingStatus = RequestStatus.Success;
      })
      .addCase(fetchSimilar.rejected, (state) => {
        state.fetchingStatus = RequestStatus.Rejected;
      });
  },
});
