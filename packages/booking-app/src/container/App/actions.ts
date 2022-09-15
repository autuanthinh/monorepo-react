import * as listTypes from './constants';

export function clear() {
  return {
    type: listTypes.CLEAR,
  };
}

export function initData() {
  return {
    type: listTypes.INIT_DATA,
  };
}

export function loadCookie(payload: any) {
  return {
    type: listTypes.LOAD_COOKIE,
    payload,
  };
}

export const setLoading = (payload: boolean) => {
  return {
    type: listTypes.SET_LOADING,
    payload,
  };
};

export const checkTokenExisted = () => {
  return {
    type: listTypes.CHECK_TOKEN,
  };
};

export const setToken = (payload: string) => {
  return {
    type: listTypes.SET_TOKEN,
    payload,
  };
};
export const login = (payload: string) => {
  return {
    type: listTypes.LOG_IN,
    payload,
  };
};

export const logout = () => {
  return {
    type: listTypes.LOG_OUT,
  };
};
