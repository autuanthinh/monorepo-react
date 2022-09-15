import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import queryString from 'query-string';
import Router from 'next/router';
import Utils, { cookie } from '@app/utils';
import * as authService from '@app/services/auth';

import pollingAuth from './pollingAuth';

import * as appTypes from '../constants';
import * as appActions from '../actions';

export function* initData(): any {
  yield delay(1000);
  yield put(appActions.setLoading(false));
}

export function* checkToken(): any {
  const queryObject = Router.query;
  const token: string = (queryObject.token || cookie.getItem('token')) as string;
  const authRequired = Utils.isAuthPage(Router.pathname);

  let replaceUrl = '/';

  if (token) {
    if (queryObject.token) {
      delete queryObject.token;

      replaceUrl = queryString.stringifyUrl({
        url: Router.pathname,
        query: queryObject,
      });
    }

    const result = yield authService.refreshToken(token);

    if (token) {
      replaceUrl = queryString.stringifyUrl({ url: Router.pathname, query: queryObject });
      Router.replace(replaceUrl);
    }

    yield put(appActions.login(result.token));
  } else {
    if (authRequired) {
      queryObject.returnUrl = Router.asPath;
      replaceUrl = queryString.stringifyUrl({ url: '/login', query: queryObject });
      Router.replace(replaceUrl);
      yield put(appActions.logout());
    }
  }
}

export function* login({ payload }: any): any {
  yield call([pollingAuth, pollingAuth.pollTask], payload);
}

export function* logout(): any {
  Router.replace('/login');
  yield call([pollingAuth, pollingAuth.cancelPoll]);
}

export default function* rootSaga() {
  yield takeLatest(appTypes.INIT_DATA, initData);
  yield takeLatest(appTypes.CHECK_TOKEN, checkToken);
  yield takeLatest(appTypes.LOG_IN, login);
  yield takeLatest(appTypes.LOG_OUT, logout);
}
