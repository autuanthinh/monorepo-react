import { combineReducers } from '@reduxjs/toolkit';

import reducerLanguage from '@app/providers/LanguageProvider/reducer';

export let rootReducer = combineReducers({});

export default function createReducer(injectedReducers = {}) {
  // @ts-ignore
  rootReducer = combineReducers({
    reducerLanguage,
    ...injectedReducers,
  });

  return rootReducer;
}

export type RootState = ReturnType<typeof rootReducer>;
