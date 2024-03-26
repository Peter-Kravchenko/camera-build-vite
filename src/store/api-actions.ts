import { toast } from 'react-toastify';
import { AxiosError, AxiosInstance } from 'axios';
import { TAppDispatch, TAppState } from '../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TCamera, TCameras } from '../types/cameras';
import { APIRoute, NameSpace } from '../const';
import { TAddReview, TReview, TReviews } from '../types/reviews';
import { TPromos } from '../types/promos';
import { TCoupon } from '../types/coupons';
import { TOrderData } from '../types/orders';

type TExtra = {
  dispatch: TAppDispatch;
  state: TAppState;
  extra: AxiosInstance;
};

export const fetchCameras = createAsyncThunk<TCameras, undefined, TExtra>(
  `${NameSpace.Cameras}/fetchCameras`,
  async (_arg, { extra: api }) => {
    const { data } = await api
      .get<TCameras>(APIRoute.Cameras)
      .catch((err: AxiosError) => {
        throw toast.error(err.message);
      });

    return data;
  }
);

export const fetchCamera = createAsyncThunk<TCamera, TCamera['id'], TExtra>(
  `${NameSpace.Camera}/fetchCamera`,
  async (id, { extra: api }) => {
    const { data } = await api
      .get<TCamera>(APIRoute.Camera.replace(':id', id.toString()))
      .catch((err: AxiosError) => {
        throw toast.error(err.message);
      });
    return data;
  }
);

export const fetchSimilar = createAsyncThunk<TCameras, TCamera['id'], TExtra>(
  `${NameSpace.Similar}/fetchSimilar`,
  async (id, { extra: api }) => {
    const { data } = await api
      .get<TCameras>(APIRoute.Similar.replace(':id', id.toString()))
      .catch((err: AxiosError) => {
        throw toast.error(err.message);
      });
    return data;
  }
);

export const fetchPromos = createAsyncThunk<TPromos, undefined, TExtra>(
  `${NameSpace.Promos}/fetchPromos`,
  async (_arg, { extra: api }) => {
    const { data } = await api
      .get<TPromos>(APIRoute.Promos)
      .catch((err: AxiosError) => {
        throw toast.error(err.message);
      });
    return data;
  }
);

export const fetchReviews = createAsyncThunk<TReviews, TCamera['id'], TExtra>(
  `${NameSpace.Reviews}/fetchReview`,
  async (id, { extra: api }) => {
    const { data } = await api
      .get<TReviews>(APIRoute.Reviews.replace(':id', id.toString()))
      .catch((err: AxiosError) => {
        throw toast.error(err.message);
      });
    return data;
  }
);

export const addReview = createAsyncThunk<TReview, TAddReview, TExtra>(
  `${NameSpace.AddReview}/addReview`,
  async (reviewData, { extra: api }) => {
    const { data } = await api
      .post<TReview>(APIRoute.AddReview, reviewData)
      .catch((err: AxiosError) => {
        throw toast.error(err.message);
      });
    return data;
  }
);

export const checkCoupon = createAsyncThunk<number, TCoupon, TExtra>(
  `${NameSpace.Coupons}/checkCoupons`,
  async (coupon, { extra: api }) => {
    const { data } = await api.post<number>(APIRoute.Coupons, { coupon });
    return data;
  }
);

export const postOrder = createAsyncThunk<string, TOrderData, TExtra>(
  `${NameSpace.Order}/fetchOrders`,
  async ({ camerasIds, coupon }, { extra: api }) => {
    const { data } = await api
      .post<string>(APIRoute.Orders, { camerasIds, coupon })
      .catch((err: AxiosError) => {
        throw toast.error(err.message);
      });
    return data;
  }
);
