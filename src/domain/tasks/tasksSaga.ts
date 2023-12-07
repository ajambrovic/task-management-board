import { type TasksConvertedServerModel, type TasksServerModel } from 'domain/tasks/tasksModel';
import { tasksActions } from 'domain/tasks/tasksSlice';
import { call, put, takeEvery } from 'typed-redux-saga';
import { API_TASKS_URL } from 'util/apiConstants';

export function* fetchTasksSaga() {
  yield* takeEvery(tasksActions.loadTasks.type, doFetchTasksSaga);
}

function* doFetchTasksSaga({ payload }: { type: string; payload: { page: number; searchQuery: string } }) {
  try {
    const response = yield* call(fetch, `${API_TASKS_URL}?_page=${payload.page}&q=${payload.searchQuery}`);
    const tasksData: TasksServerModel = yield response.json();

    yield* put(tasksActions.tasksLoadSuccess(convertTasksServerDataToLocalData(tasksData)));
  } catch (error) {
    yield* put(tasksActions.tasksLoadFailed);
  }
}

function convertTasksServerDataToLocalData(tasks: TasksServerModel) {
  const convertedTasks: TasksConvertedServerModel = {
    ids: [],
    byId: {},
  };

  tasks.forEach((task) => {
    convertedTasks.ids.push(task.id);
    convertedTasks.byId[task.id] = task;
  });

  return convertedTasks;
}
