import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { TAddReviewData } from '../../types/state';
import { addReview } from '../api-actions';

const initialState: TAddReviewData = {
  fetchingStatus: RequestStatus.Idle,
};

export const addReviewData = createSlice({
  name: NameSpace.AddReview,
  initialState,
  reducers: {
    resetAddReviewFetchigStatus: (state) => {
      state.fetchingStatus = RequestStatus.Idle;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addReview.pending, (state) => {
        state.fetchingStatus = RequestStatus.Pending;
      })
      .addCase(addReview.fulfilled, (state) => {
        state.fetchingStatus = RequestStatus.Success;
      })
      .addCase(addReview.rejected, (state) => {
        state.fetchingStatus = RequestStatus.Rejected;
      });
  },
});

export const { resetAddReviewFetchigStatus } = addReviewData.actions;
