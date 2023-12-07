import { fetchTasksSaga } from 'domain/tasks/tasksSaga';
import { all, fork } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([fork(fetchTasksSaga)]);
}
