import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { TAppState } from '../types/state';
import { Action } from 'redux';
import {
  TAppThunkDispatch,
  extractActionsTypes,
  makeFakeCamera,
  makeFakeCameras,
  makeFakePromos,
  makeFakeReview,
  makeFakeReviews,
} from '../utils/mocks';
import { APIRoute } from '../const';
import {
  addReview,
  fetchCamera,
  fetchCameras,
  fetchPromos,
  fetchReviews,
  fetchSimilar,
} from './api-actions';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    TAppState,
    Action<string>,
    TAppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      CAMERAS: {
        cameras: [],
      },
      PROMOS: {
        promos: [],
      },
      SIMILAR: {
        similar: [],
      },
      REVIEWS: {
        reviews: [],
      },
    });
  });

  describe('fetchCameras', () => {
    it('should dispatch "fetchCameras.pending", "fetchCameras.fulfulled", when server response 200', async () => {
      const mockCameras = makeFakeCameras();
      mockAxiosAdapter.onGet(APIRoute.Cameras).reply(200, mockCameras);

      await store.dispatch(fetchCameras());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCamerasFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchCameras.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchCameras.pending.type,
        fetchCameras.fulfilled.type,
      ]);

      expect(fetchCamerasFulfilled.payload).toEqual(mockCameras);
    });

    it('should dispatch "fetchCameras.pending", "fetchCameras.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Cameras).reply(400, []);

      await store.dispatch(fetchCameras());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCameras.pending.type,
        fetchCameras.rejected.type,
      ]);
    });
  });

  describe('fetchCamera', () => {
    it('should dispatch "fetchCamera.pending", "fetchCamera.fulfulled", when server response 200', async () => {
      const mockCamera = makeFakeCamera();
      const mockId = mockCamera.id;
      mockAxiosAdapter
        .onGet(APIRoute.Camera.replace(':id', mockId.toString()))
        .reply(200, mockCamera);

      await store.dispatch(fetchCamera(mockId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCameraFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchCamera.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchCamera.pending.type,
        fetchCamera.fulfilled.type,
      ]);
      expect(fetchCameraFulfilled.payload).toEqual(mockCamera);
    });

    it('should dispatch "fetchCamera.pending", "fetchCamera.rejected", when server response 400', async () => {
      const mockId = 1;
      mockAxiosAdapter
        .onGet(APIRoute.Camera.replace(':id', mockId.toString()))
        .reply(400, []);

      await store.dispatch(fetchCamera(mockId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCamera.pending.type,
        fetchCamera.rejected.type,
      ]);
    });
  });
  describe('fetchSimilar', () => {
    it('should dispatch "fetchSimilar.pending", "fetchSimilar.fulfulled", when server response 200', async () => {
      const mockId = makeFakeCamera().id;
      const mockCameras = makeFakeCameras();
      mockAxiosAdapter
        .onGet(APIRoute.Similar.replace(':id', mockId.toString()))
        .reply(200, mockCameras);

      await store.dispatch(fetchSimilar(mockId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchSimilarFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchSimilar.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchSimilar.pending.type,
        fetchSimilar.fulfilled.type,
      ]);
      expect(fetchSimilarFulfilled.payload).toEqual(mockCameras);
    });

    it('should dispatch "fetchSimilar.pending", "fetchSimilar.rejected", when server response 400', async () => {
      const mockId = 1;
      mockAxiosAdapter
        .onGet(APIRoute.Similar.replace(':id', mockId.toString()))
        .reply(400, []);

      await store.dispatch(fetchSimilar(mockId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSimilar.pending.type,
        fetchSimilar.rejected.type,
      ]);
    });
  });
  describe('fetchPromos', () => {
    it('should dispatch "fetchPromos.pending", "fetchPromos.fulfulled", when server response 200', async () => {
      const mockPromos = makeFakePromos();
      mockAxiosAdapter.onGet(APIRoute.Promos).reply(200, mockPromos);

      await store.dispatch(fetchPromos());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchPromosFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchPromos.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchPromos.pending.type,
        fetchPromos.fulfilled.type,
      ]);
      expect(fetchPromosFulfilled.payload).toEqual(mockPromos);
    });
    it('should dispatch "fetchPromos.pending", "fetchPromos.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promos).reply(400, []);

      await store.dispatch(fetchPromos());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchPromos.pending.type,
        fetchPromos.rejected.type,
      ]);
    });
  });
  describe('fetchReviews', () => {
    it('should dispatch "fetchReviews.pending", "fetchReviews.fulfulled", when server response 200', async () => {
      const mockId = makeFakeCamera().id;
      const mockReviews = makeFakeReviews();
      mockAxiosAdapter
        .onGet(APIRoute.Reviews.replace(':id', mockId.toString()))
        .reply(200, mockReviews);

      await store.dispatch(fetchReviews(mockId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchReviews.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchReviews.pending.type,
        fetchReviews.fulfilled.type,
      ]);
      expect(fetchReviewsFulfilled.payload).toEqual(mockReviews);
    });
    it('should dispatch "fetchReviews.pending", "fetchReviews.rejected", when server response 400', async () => {
      const mockId = 1;
      mockAxiosAdapter
        .onGet(APIRoute.Reviews.replace(':id', mockId.toString()))
        .reply(400, []);

      await store.dispatch(fetchReviews(mockId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviews.pending.type,
        fetchReviews.rejected.type,
      ]);
    });
  });

  describe('addReview', () => {
    it('should dispatch "addReview.pending", "addReview.fulfulled", when server response 200', async () => {
      const mockReview = makeFakeReview();
      mockAxiosAdapter.onPost(APIRoute.AddReview).reply(200, mockReview);

      await store.dispatch(addReview(mockReview));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const addReviewFulfilled = emittedActions.at(1) as ReturnType<
        typeof addReview.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        addReview.pending.type,
        addReview.fulfilled.type,
      ]);
      expect(addReviewFulfilled.payload).toEqual(mockReview);
    });
    it('should dispatch "addReview.pending", "addReview.rejected", when server response 400', async () => {
      const mockReview = makeFakeReview();
      mockAxiosAdapter.onPost(APIRoute.AddReview).reply(400, []);

      await store.dispatch(addReview(mockReview));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        addReview.pending.type,
        addReview.rejected.type,
      ]);
    });
  });
});
