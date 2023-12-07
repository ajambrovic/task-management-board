import { type TaskModel, type TasksConvertedServerModel, type TasksServerModel } from 'domain/tasks/tasksModel';
import { selectTaskById } from 'domain/tasks/tasksSelector';
import { tasksActions } from 'domain/tasks/tasksSlice';
import { isEqual } from 'lodash';
import { call, put, select, takeEvery } from 'typed-redux-saga';
import { API_TASKS_URL } from 'util/apiConstants';

export function* fetchTasksSaga() {
  yield* takeEvery(tasksActions.loadTasks.type, doFetchTasksSaga);
}

export function* editTaskSaga() {
  yield* takeEvery(tasksActions.editTask.type, doEditTaskSaga);
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

function* doEditTaskSaga({ data }: { type: string; data: TaskModel }) {
  const currentTaskData = yield* select(selectTaskById, data.id);
  if (isEqual(currentTaskData, data)) {
    return;
  }

  try {
    yield* put(tasksActions.editTask(data));
    yield* call(fetch, `${API_TASKS_URL}/${data.id}`, {
      ...DEFAULT_HEADERS,
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
      }),
    });
  } catch (error) {
    yield* put(tasksActions.editTask(currentTaskData));
  }
}

const DEFAULT_HEADERS = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

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
