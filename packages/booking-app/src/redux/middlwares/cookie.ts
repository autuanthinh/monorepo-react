// import { HYDRATE } from 'next-redux-wrapper';
import { SERVE_COOKIES } from 'next-redux-cookie-wrapper';
import { AnyAction, Middleware } from 'redux';
import { parseCookies } from 'nookies';

import * as appActions from '@app/container/App/actions';
// import * as appConstants from '@app/container/App/constants';

export const customCookieMiddleware: () => Middleware = () => store => {
  return next => (action: AnyAction) => {
    switch (action.type) {
      case SERVE_COOKIES: {
        const pCookies = parseCookies(action.payload._context);
        store.dispatch(appActions.loadCookie(pCookies));
        return;
      }

      default: {
        const result = next(action);
        return result;
      }
    }
  };
};
