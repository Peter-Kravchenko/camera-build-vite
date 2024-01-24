import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TAppState, TCameraData } from '../../types/state';

export const getCamera = createSelector(
  (state: TAppState) => state[NameSpace.Camera],
  (state: TCameraData) => state.camera
);

export const getCameraFetchingStatus = createSelector(
  (state: TAppState) => state[NameSpace.Camera],
  (state: TCameraData) => state.fetchingStatus
);
