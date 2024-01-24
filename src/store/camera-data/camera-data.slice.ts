import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { TCameraData } from '../../types/state';
import { fetchCamera } from '../api-actions';

const initialState: TCameraData = {
  camera: null,
  fetchingStatus: RequestStatus.Idle,
};

export const cameraData = createSlice({
  name: NameSpace.Camera,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamera.pending, (state) => {
        state.fetchingStatus = RequestStatus.Pending;
      })
      .addCase(fetchCamera.fulfilled, (state, action) => {
        state.camera = action.payload;
        state.fetchingStatus = RequestStatus.Success;
      })
      .addCase(fetchCamera.rejected, (state) => {
        state.fetchingStatus = RequestStatus.Rejected;
      });
  },
});
