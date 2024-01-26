import { AxiosInstance } from 'axios';
import { TAppDispatch, TAppState } from '../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TCamera, TCameras } from '../types/cameras';
import { APIRoute, NameSpace } from '../const';
import { TAddRewiew, TReviews } from '../types/reviews';
import { TPromos } from '../types/promo';

type TExtra = {
  dispatch: TAppDispatch;
  state: TAppState;
  extra: AxiosInstance;
};

export const fetchCameras = createAsyncThunk<TCameras, undefined, TExtra>(
  `${NameSpace.Cameras}/fetchCameras`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TCameras>(APIRoute.Cameras);
    return data;
  }
);

export const fetchCamera = createAsyncThunk<TCamera, TCamera['id'], TExtra>(
  `${NameSpace.Camera}/fetchCamera`,
  async (id, { extra: api }) => {
    const { data } = await api.get<TCamera>(
      APIRoute.Camera.replace(':id', id.toString())
    );
    return data;
  }
);

export const fetchSimilar = createAsyncThunk<TCameras, TCamera['id'], TExtra>(
  `${NameSpace.Similar}/fetchSimilar`,
  async (id, { extra: api }) => {
    const { data } = await api.get<TCameras>(
      APIRoute.Similar.replace(':id', id.toString())
    );
    return data;
  }
);

export const fetchPromos = createAsyncThunk<TPromos, undefined, TExtra>(
  `${NameSpace.Promos}/fetchPromos`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TPromos>(APIRoute.Promos);
    return data;
  }
);

export const fetchReviews = createAsyncThunk<TReviews, TCamera['id'], TExtra>(
  `${NameSpace.Reviews}/fetchReview`,
  async (id, { extra: api }) => {
    const { data } = await api.get<TReviews>(
      APIRoute.Reviews.replace(':id', id.toString())
    );
    return data;
  }
);

export const addReview = createAsyncThunk<TAddRewiew, TCamera, TExtra>(
  `${NameSpace.Reviews}/addReview`,
  async (review, { extra: api }) => {
    const { data } = await api.post<TAddRewiew>(APIRoute.AddReview, review);
    return data;
  }
);
