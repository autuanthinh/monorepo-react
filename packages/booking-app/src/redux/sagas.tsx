import { all, fork } from 'redux-saga/effects';

import sagaApp from '@app/container/App/saga';

export default function* rootSaga() {
  yield all([fork(sagaApp)]);
}
