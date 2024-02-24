import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TModalData } from '../../types/state';

const initialState: TModalData = {
  isModalOpen: false,
  isModalAddToBasketOpen: false,
  isModalAddToBasketSuccessOpen: false,
  isModalAddReviewOpen: false,
  isModalAddReviewSuccessOpen: false,
  isModalRemoveFromBasketOpen: false,
};

export const modalProcess = createSlice({
  name: NameSpace.Modal,
  initialState,
  reducers: {
    openAddToBasketModal: (state) => {
      state.isModalOpen = true;
      state.isModalAddToBasketOpen = true;
    },
    closeAddToBasketModal: (state) => {
      state.isModalOpen = false;
      state.isModalAddToBasketOpen = false;
      state.isModalRemoveFromBasketOpen = false;
    },
    openAddToBasketSuccessModal: (state) => {
      state.isModalOpen = true;
      state.isModalAddToBasketSuccessOpen = true;
    },
    closeAddToBasketSuccessModal: (state) => {
      state.isModalOpen = false;
      state.isModalAddToBasketSuccessOpen = false;
    },
    openAddReviewModal: (state) => {
      state.isModalOpen = true;
      state.isModalAddReviewOpen = true;
    },
    closeAddReviewModal: (state) => {
      state.isModalOpen = false;
      state.isModalAddReviewOpen = false;
    },
    openAddReviewSuccessModal: (state) => {
      state.isModalOpen = true;
      state.isModalAddReviewSuccessOpen = true;
    },
    closeAddReviewSuccessModal: (state) => {
      state.isModalOpen = false;
      state.isModalAddReviewSuccessOpen = false;
    },
    openRemoveFromBasketModal: (state) => {
      state.isModalOpen = true;
      state.isModalRemoveFromBasketOpen = true;
    },
    closeRemoveFromBasketModal: (state) => {
      state.isModalOpen = false;
      state.isModalRemoveFromBasketOpen = false;
    },
    resetModalStatus: (state) => {
      state.isModalOpen = false;
      state.isModalAddToBasketOpen = false;
      state.isModalAddToBasketSuccessOpen = false;
      state.isModalAddReviewOpen = false;
      state.isModalAddReviewSuccessOpen = false;
      state.isModalRemoveFromBasketOpen = false;
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
  openAddReviewSuccessModal,
  closeAddReviewSuccessModal,
  openRemoveFromBasketModal,
  resetModalStatus,
} = modalProcess.actions;
