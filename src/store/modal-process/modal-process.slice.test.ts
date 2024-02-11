import { modalProcess } from './modal-process.slice';

describe('ModalProcess slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {
      type: '',
    };
    const expectedState = {
      isModalAddToBasketOpen: false,
      isModalAddToBasketSuccessOpen: false,
      isModalAddReviewOpen: false,
      isModalAddReviewSuccessOpen: false,
    };

    const result = modalProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {
      type: '',
    };
    const expectedState = {
      isModalAddToBasketOpen: false,
      isModalAddToBasketSuccessOpen: false,
      isModalAddReviewOpen: false,
      isModalAddReviewSuccessOpen: false,
    };

    const result = modalProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set isModalAddToBasketOpen to true with "openModalAddToBasket"', () => {
    const initialState = {
      isModalAddToBasketOpen: false,
      isModalAddToBasketSuccessOpen: false,
      isModalAddReviewOpen: false,
      isModalAddReviewSuccessOpen: false,
    };
    const expectedState = {
      isModalAddToBasketOpen: true,
      isModalAddToBasketSuccessOpen: false,
      isModalAddReviewOpen: false,
      isModalAddReviewSuccessOpen: false,
    };

    const result = modalProcess.reducer(
      initialState,
      modalProcess.actions.openAddToBasketModal()
    );

    expect(result).toEqual(expectedState);
  });

  it('should set isModalAddToBasketSuccessOpen to true with "openModalAddToBasketSuccess"', () => {
    const initialState = {
      isModalAddToBasketOpen: false,
      isModalAddToBasketSuccessOpen: false,
      isModalAddReviewOpen: false,
      isModalAddReviewSuccessOpen: false,
    };
    const expectedState = {
      isModalAddToBasketOpen: false,
      isModalAddToBasketSuccessOpen: true,
      isModalAddReviewOpen: false,
      isModalAddReviewSuccessOpen: false,
    };

    const result = modalProcess.reducer(
      initialState,
      modalProcess.actions.openAddToBasketSuccessModal()
    );

    expect(result).toEqual(expectedState);
  });

  it('should set isModalAddReviewOpen to true with "openModalAddReview"', () => {
    const initialState = {
      isModalAddToBasketOpen: false,
      isModalAddToBasketSuccessOpen: false,
      isModalAddReviewOpen: false,
      isModalAddReviewSuccessOpen: false,
    };
    const expectedState = {
      isModalAddToBasketOpen: false,
      isModalAddToBasketSuccessOpen: false,
      isModalAddReviewOpen: true,
      isModalAddReviewSuccessOpen: false,
    };

    const result = modalProcess.reducer(
      initialState,
      modalProcess.actions.openAddReviewModal()
    );

    expect(result).toEqual(expectedState);
  });

  it('should set isModalAddReviewSuccessOpen to true with "openModalAddReviewSuccess"', () => {
    const initialState = {
      isModalAddToBasketOpen: false,
      isModalAddToBasketSuccessOpen: false,
      isModalAddReviewOpen: false,
      isModalAddReviewSuccessOpen: false,
    };
    const expectedState = {
      isModalAddToBasketOpen: false,
      isModalAddToBasketSuccessOpen: false,
      isModalAddReviewOpen: false,
      isModalAddReviewSuccessOpen: true,
    };

    const result = modalProcess.reducer(
      initialState,
      modalProcess.actions.openAddReviewSuccessModal()
    );

    expect(result).toEqual(expectedState);
  });

  it('should set isModalAddToBasketOpen to false with "closeModalAddToBasket"', () => {
    const initialState = {
      isModalAddToBasketOpen: true,
      isModalAddToBasketSuccessOpen: false,
      isModalAddReviewOpen: false,
      isModalAddReviewSuccessOpen: false,
    };
    const expectedState = {
      isModalAddToBasketOpen: false,
      isModalAddToBasketSuccessOpen: false,
      isModalAddReviewOpen: false,
      isModalAddReviewSuccessOpen: false,
    };

    const result = modalProcess.reducer(
      initialState,
      modalProcess.actions.closeAddToBasketModal()
    );

    expect(result).toEqual(expectedState);
  });

  it('should set isModalAddToBasketSuccessOpen to false with "closeModalAddToBasketSuccess"', () => {
    const initialState = {
      isModalAddToBasketOpen: false,
      isModalAddToBasketSuccessOpen: true,
      isModalAddReviewOpen: false,
      isModalAddReviewSuccessOpen: false,
    };
    const expectedState = {
      isModalAddToBasketOpen: false,
      isModalAddToBasketSuccessOpen: false,
      isModalAddReviewOpen: false,
      isModalAddReviewSuccessOpen: false,
    };

    const result = modalProcess.reducer(
      initialState,
      modalProcess.actions.closeAddToBasketSuccessModal()
    );

    expect(result).toEqual(expectedState);
  });

  it('should set isModalAddReviewOpen to false with "closeModalAddReview"', () => {
    const initialState = {
      isModalAddToBasketOpen: false,
      isModalAddToBasketSuccessOpen: false,
      isModalAddReviewOpen: true,
      isModalAddReviewSuccessOpen: false,
    };
    const expectedState = {
      isModalAddToBasketOpen: false,
      isModalAddToBasketSuccessOpen: false,
      isModalAddReviewOpen: false,
      isModalAddReviewSuccessOpen: false,
    };

    const result = modalProcess.reducer(
      initialState,
      modalProcess.actions.closeAddReviewModal()
    );

    expect(result).toEqual(expectedState);
  });

  it('should set isModalAddReviewSuccessOpen to false with "closeModalAddReviewSuccess"', () => {
    const initialState = {
      isModalAddToBasketOpen: false,
      isModalAddToBasketSuccessOpen: false,
      isModalAddReviewOpen: false,
      isModalAddReviewSuccessOpen: true,
    };
    const expectedState = {
      isModalAddToBasketOpen: false,
      isModalAddToBasketSuccessOpen: false,
      isModalAddReviewOpen: false,
      isModalAddReviewSuccessOpen: false,
    };

    const result = modalProcess.reducer(
      initialState,
      modalProcess.actions.closeAddReviewSuccessModal()
    );

    expect(result).toEqual(expectedState);
  });

  it('should set modals status false with "resetModalStatus"', () => {
    const initialState = {
      isModalAddToBasketOpen: true,
      isModalAddToBasketSuccessOpen: true,
      isModalAddReviewOpen: true,
      isModalAddReviewSuccessOpen: true,
    };
    const expectedState = {
      isModalAddToBasketOpen: false,
      isModalAddToBasketSuccessOpen: false,
      isModalAddReviewOpen: false,
      isModalAddReviewSuccessOpen: false,
    };

    const result = modalProcess.reducer(
      initialState,
      modalProcess.actions.resetModalStatus()
    );

    expect(result).toEqual(expectedState);
  });
});
