import { createTaskSaga, deleteTaskSaga, editTaskSaga, fetchTasksSaga, loadInitialData } from 'domain/tasks/tasksSaga';
import { all, fork } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    fork(fetchTasksSaga),
    fork(editTaskSaga),
    fork(deleteTaskSaga),
    fork(createTaskSaga),
    fork(loadInitialData),
  ]);
}
