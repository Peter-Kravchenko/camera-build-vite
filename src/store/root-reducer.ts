import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { camerasData } from './cameras-data/cameras-data.slice';
import { cameraData } from './camera-data/camera-data.slice';
import { promosData } from './promos-data/promos-data.slice';
import { similarData } from './similar-data/similar-data.slice';
import { reviewsData } from './reviews-data/reviews-data.slice';
import { modalProcess } from './modal-process/modal-process.slice';

export const rootReducer = combineReducers({
  [NameSpace.Modal]: modalProcess.reducer,
  [NameSpace.Cameras]: camerasData.reducer,
  [NameSpace.Camera]: cameraData.reducer,
  [NameSpace.Promos]: promosData.reducer,
  [NameSpace.Similar]: similarData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
});
