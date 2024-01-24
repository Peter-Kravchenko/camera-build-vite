import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { TReviewsData } from '../../types/state';
import { fetchReviews } from '../api-actions';

const initialState: TReviewsData = {
  reviews: [],
  fetchingStatus: RequestStatus.Idle,
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.fetchingStatus = RequestStatus.Pending;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.fetchingStatus = RequestStatus.Success;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.fetchingStatus = RequestStatus.Rejected;
      });
  },
});
