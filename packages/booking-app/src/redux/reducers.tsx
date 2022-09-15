import { combineReducers } from '@reduxjs/toolkit';

import reducerApp from '@app/container/App/reducer';
import reducerLanguage from '@app/providers/LanguageProvider/reducer';

export default function createReducer(injectedReducers = {}) {
  // @ts-ignore
  const rootReducer = combineReducers({
    reducerLanguage,
    reducerApp,
    ...injectedReducers,
  });

  return rootReducer;
}

// export type RootState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<ReturnType<typeof createReducer>>;
