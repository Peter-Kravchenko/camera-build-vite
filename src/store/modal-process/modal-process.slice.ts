import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TModalData } from '../../types/state';

const initialState: TModalData = {
  isModalAddToBasketOpen: false,
  isModalAddToBasketSuccessOpen: false,
  isModalAddReviewOpen: false,
};

export const modalProcess = createSlice({
  name: NameSpace.Modal,
  initialState,
  reducers: {
    openAddToBasketModal: (state) => {
      state.isModalAddToBasketOpen = true;
    },
    closeAddToBasketModal: (state) => {
      state.isModalAddToBasketOpen = false;
    },
    openAddToBasketSuccessModal: (state) => {
      state.isModalAddToBasketSuccessOpen = true;
    },
    closeAddToBasketSuccessModal: (state) => {
      state.isModalAddToBasketSuccessOpen = false;
    },
    openAddReviewModal: (state) => {
      state.isModalAddReviewOpen = true;
    },
    closeAddReviewModal: (state) => {
      state.isModalAddReviewOpen = false;
    },
  },
});

export const {
  openAddToBasketModal,
  closeAddToBasketModal,
  openAddToBasketSuccessModal,
  closeAddToBasketSuccessModal,
  openAddReviewModal,
  closeAddReviewModal,
} = modalProcess.actions;
