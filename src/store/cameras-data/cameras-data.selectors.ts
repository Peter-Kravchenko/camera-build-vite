import { createSelector } from '@reduxjs/toolkit';
import { TAppState, TCamerasData } from '../../types/state';
import { NameSpace } from '../../const';

export const getCameras = createSelector(
  (state: Pick<TAppState, NameSpace.Cameras>) => state[NameSpace.Cameras],
  (state: TCamerasData) => state.cameras
);

export const getCamerasFetchingStatus = createSelector(
  (state: Pick<TAppState, NameSpace.Cameras>) => state[NameSpace.Cameras],
  (state: TCamerasData) => state.fetchingStatus
);
