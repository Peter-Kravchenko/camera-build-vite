import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { TOrderData } from '../../types/state';
import { checkCoupon, postOrder } from '../api-actions';
import { TOrder, TOrders } from '../../types/orders';
import { TCamera } from '../../types/cameras';

const initialState: TOrderData = {
  orders: [],
  camerasIds: null,
  coupon: null,
  couponFetchingStatus: RequestStatus.Idle,
  orderFetchingStatus: RequestStatus.Idle,
};

export const orderData = createSlice({
  name: NameSpace.Order,
  initialState,
  reducers: {
    loadOrder: (state) => {
      const orderInLocalStorage = localStorage.getItem('orders');
      if (orderInLocalStorage) {
        state.orders = JSON.parse(orderInLocalStorage) as TOrders;
      }
    },
    addToBasket: (state, action: PayloadAction<TCamera>) => {
      const data = [...state.orders, { ...action.payload, quantity: 1 }];
      state.orders = data;
      localStorage.setItem('orders', JSON.stringify(data));
    },

    changeQuantity: (state, action: PayloadAction<[TOrder['id'], number]>) => {
      const data = (state.orders = state.orders.map((camera) => {
        if (camera.id === action.payload[0]) {
          return { ...camera, quantity: action.payload[1] };
        }
        return camera;
      }));
      state.orders = data;
      localStorage.setItem('orders', JSON.stringify(data));
    },
    removeFromBasket: (state, action: PayloadAction<TCamera['id']>) => {
      const data = (state.orders = state.orders.filter(
        (camera) => camera.id !== action.payload
      ));

      state.orders = data;

      localStorage.setItem('orders', JSON.stringify(data));
    },
    clearBasket: (state) => {
      state.orders = [];
      localStorage.removeItem('orders');
    },
    resetCouponFetchingStatus: (state) => {
      state.couponFetchingStatus = RequestStatus.Idle;
    },
    resetOrderFetchingStatus: (state) => {
      state.orderFetchingStatus = RequestStatus.Idle;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postOrder.pending, (state) => {
        state.orderFetchingStatus = RequestStatus.Pending;
      })
      .addCase(postOrder.fulfilled, (state) => {
        state.orderFetchingStatus = RequestStatus.Success;
      })
      .addCase(postOrder.rejected, (state) => {
        state.orderFetchingStatus = RequestStatus.Rejected;
      })
      .addCase(checkCoupon.pending, (state) => {
        state.couponFetchingStatus = RequestStatus.Pending;
      })
      .addCase(checkCoupon.fulfilled, (state, action) => {
        state.couponFetchingStatus = RequestStatus.Success;
        state.coupon = action.payload;
      })
      .addCase(checkCoupon.rejected, (state) => {
        state.couponFetchingStatus = RequestStatus.Rejected;
      });
  },
});

export const {
  loadOrder,
  addToBasket,
  changeQuantity,
  removeFromBasket,
  clearBasket,
  resetCouponFetchingStatus,
  resetOrderFetchingStatus,
} = orderData.actions;
