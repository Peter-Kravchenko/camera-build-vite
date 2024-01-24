import { createSlice } from '@reduxjs/toolkit';
import { TCamerasData as TCamerasData } from '../../types/state';
import { NameSpace, RequestStatus } from '../../const';
import { fetchCameras } from '../api-actions';

const initialState: TCamerasData = {
  cameras: [],
  fetchingStatus: RequestStatus.Idle,
};

export const camerasData = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCameras.pending, (state) => {
        state.fetchingStatus = RequestStatus.Pending;
      })
      .addCase(fetchCameras.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.fetchingStatus = RequestStatus.Success;
      })
      .addCase(fetchCameras.rejected, (state) => {
        state.fetchingStatus = RequestStatus.Rejected;
      });
  },
});
