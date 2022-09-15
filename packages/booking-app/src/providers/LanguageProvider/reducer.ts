import { fromJS } from 'immutable';
import { ImmutableState } from '@app/types/index';
// import { localStorage } from 'app/utils';
// import { setMomentLocale } from './momentLocales';
// import { setNumeralLocale } from './numeralLocales';

import { SET_LANGUAGE, DEFAULT_LANGUAGE } from './constants';
import { LOAD_COOKIE } from '@app/container/App/constants';
import { HYDRATE } from 'next-redux-wrapper';

// setMomentLocale(initLang);
// setNumeralLocale(initLang);

const initialState = fromJS({
  language: DEFAULT_LANGUAGE,
}) as ImmutableState;

function reducer(state: ImmutableState = initialState, action: any): ImmutableState {
  switch (action.type) {
    case SET_LANGUAGE:
      // localStorage.setLanguage(action.language);
      // setMomentLocale(action.language);
      // setNumeralLocale(action.language);
      return state.set('language', action.language);
    case LOAD_COOKIE:
      console.log('BBBBBBBBBBBBBBB', action.payload.language);
      return state.set('language', action.payload.language);
    default:
      return state;
  }
}

export default reducer;
