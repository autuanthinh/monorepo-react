import { fromJS } from 'immutable';
import * as nameActList from './constants';
import { ImmutableState } from '@app/types';
import { cookie } from '@app/utils';

const getInitData = () => {
  return fromJS({
    isLoading: true,
    isCheckedLogin: false,
    token: '',
  }) as ImmutableState;
};

const reducer = (state: ImmutableState = getInitData(), action: any): ImmutableState => {
  switch (action.type) {
    case nameActList.INIT_DATA:
      return state.set('isLoading', true);
    // App status
    case nameActList.SET_LOADING:
      return state.set('isLoading', action.payload);

    // Auth
    case nameActList.SET_TOKEN:
    case nameActList.LOG_IN:
      cookie.setToken(action.payload);
      return state.set('token', action.payload).set('isCheckedLogin', true);

    case nameActList.LOG_OUT:
      cookie.removeToken();
      return getInitData().set('isCheckedLogin', true).set('isLoading', false);
    case nameActList.CLEAR:
      return getInitData().set('isCheckedLogin', true).set('isLoading', false);
    default:
      return state;
  }
};

export default reducer;
