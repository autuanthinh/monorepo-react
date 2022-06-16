import { fromJS } from 'immutable';
import { ImmutableState } from '@app/types/index';
// import { localStorage } from 'app/utils';
// import { setMomentLocale } from './momentLocales';
// import { setNumeralLocale } from './numeralLocales';

import { SET_LANGUAGE, DEFAULT_LANGUAGE } from './constants';

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
    default:
      return state;
  }
}

export default reducer;
