import { type PayloadAction } from '@reduxjs/toolkit';
import {
  type TaskModel,
  type TaskStatus,
  type TasksConvertedServerModel,
  type TasksServerModel,
} from 'domain/tasks/tasksModel';
import { selectTaskById, selectTaskIndex } from 'domain/tasks/tasksSelector';
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

export function* deleteTaskSaga() {
  yield* takeEvery(tasksActions.deleteTask.type, doDeleteTaskSaga);
}

export function* createTaskSaga() {
  yield* takeEvery(tasksActions.createTask.type, doCreateTaskSaga);
}

export function* changeTaskStatus() {
  yield* takeEvery(tasksActions.changeTaskStatus.type, doChangeTaskStatus);
}

function* doFetchTasksSaga({
  payload,
}: {
  type: PayloadAction['type'];
  payload: { page: number; searchQuery: string };
}) {
  try {
    const URL = `${API_TASKS_URL}`;
    const response = yield* call(fetch, URL);
    const tasksData: TasksServerModel = yield response.json();

    yield* put(tasksActions.tasksLoadSuccess(convertTasksServerDataToLocalData(tasksData)));
  } catch (error) {
    yield* put(tasksActions.tasksLoadFailed);
  }
}

function* doEditTaskSaga({ data }: { type: PayloadAction['type']; data: TaskModel }) {
  const currentTaskData = yield* select(selectTaskById, data.id);
  if (isEqual(currentTaskData, data)) {
    return;
  }

  try {
    yield* put(tasksActions.editTaskLocally(data));
    yield* call(fetch, `${API_TASKS_URL}/${data.id}`, {
      ...DEFAULT_HEADERS,
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
      }),
    });
  } catch (error) {
    yield* put(tasksActions.editTaskLocally(currentTaskData));
  }
}

function* doDeleteTaskSaga({ data: id }: { type: PayloadAction['type']; data: TaskModel['id'] }) {
  const currentTaskData = yield* select(selectTaskById, id);
  const taskIndex = yield* select(selectTaskIndex, id);

  try {
    yield* put(tasksActions.deleteTaskLocally(id));
    yield* call(fetch, `${API_TASKS_URL}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    yield* put(
      tasksActions.revertDeleteTask({
        task: currentTaskData,
        taskIndex,
      }),
    );
  }
}

function* doCreateTaskSaga({ data }: { type: PayloadAction['type']; data: TaskModel }) {
  try {
    const response = yield* call(fetch, `${API_TASKS_URL}`, {
      method: 'POST',
      ...DEFAULT_HEADERS,
      body: JSON.stringify({
        data,
      }),
    });
    const newTask: TaskModel = yield response.json();
    yield* put(tasksActions.createTaskLocallyAction(newTask));
  } catch (error) {
    console.log(error);
  }
}

function* doChangeTaskStatus({
  data,
}: {
  type: PayloadAction['type'];
  data: { taskStatus: TaskStatus; id: TaskModel['id'] };
}) {
  const currentTaskData = yield* select(selectTaskById, data.id);
  currentTaskData.status = data.taskStatus;
  yield* put(tasksActions.editTask(currentTaskData));
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
