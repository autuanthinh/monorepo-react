import { configureStore, EnhancedStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createInjectorsEnhancer } from 'redux-injectors';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { fromJS } from 'immutable';
import _ from 'lodash';
import { nextReduxCookieMiddleware, wrapMakeStore } from 'next-redux-cookie-wrapper';
import { customCookieMiddleware } from './middlwares/cookie';

import createReducer from './reducers';
import rootSaga from './sagas';
const sagaMiddleware = createSagaMiddleware();

const reducers = createReducer();

const masterReducers = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ..._.mapValues(action.payload, value => fromJS(value)),
    };
    return nextState;
  } else {
    return reducers(state, action);
  }
};

export function makeStore(initialState = {}): EnhancedStore {
  const { run: runSaga } = sagaMiddleware;

  // sagaMiddleware: Makes redux-sagas work
  const middlewares = [sagaMiddleware];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ];

  const store = configureStore({
    // reducer: reducers,
    reducer: masterReducers,
    middleware: [
      ...getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
      ...middlewares,
      customCookieMiddleware(),
      nextReduxCookieMiddleware({
        subtrees: [
          {
            subtree: 'reducerLanguage',
            cookieName: 'language',
            compress: false,
            ignoreStateFromStaticProps: false,
          },
        ],
      }),
    ],
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
    enhancers,
  });

  sagaMiddleware.run(rootSaga);
  return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(wrapMakeStore(makeStore), { debug: false });
