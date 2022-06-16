import { all, fork } from 'redux-saga/effects';

// import sagaApp from 'app/app/saga';

export default function* rootSaga() {
  yield all([
    // fork(sagaApp)
  ]);
}
