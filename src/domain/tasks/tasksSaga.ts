import { type PayloadAction } from '@reduxjs/toolkit';
import {
  type TaskModel,
  type TaskStatus,
  type TasksConvertedServerModel,
  type TasksServerModel,
} from 'domain/tasks/tasksModel';
import { selectTaskById, selectTaskIndex, selectTasksIds } from 'domain/tasks/tasksSelector';
import { tasksActions } from 'domain/tasks/tasksSlice';
import { isEqual } from 'lodash';
import { rehydrationFinishedAction } from 'redux/store';
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

export function* loadInitialData() {
  yield takeEvery(rehydrationFinishedAction.type, function* () {
    const taskIds = yield* select(selectTasksIds);
    if (taskIds.length === 0) {
      yield* put(tasksActions.loadTasks());
    } else {
      yield* put(tasksActions.rehydrationFinished());
    }
  });
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
    if (response.status === 200) {
      const tasksData: TasksServerModel = yield response.json();
      yield* put(tasksActions.tasksLoadSuccess(convertTasksServerDataToLocalData(tasksData)));
    } else {
      yield* put(tasksActions.tasksActionFailed('Saving to server failed'));
    }
  } catch (error) {
    yield* put(tasksActions.tasksActionFailed('Saving to server failed'));
  }
}

function* doEditTaskSaga({ payload }: { type: PayloadAction['type']; payload: TaskModel }) {
  const currentTaskData = yield* select(selectTaskById, payload.id);
  if (isEqual(currentTaskData, payload)) {
    return;
  }

  try {
    yield* put(tasksActions.editTaskLocally(payload));
    const response = yield* call(fetch, `${API_TASKS_URL}/${payload.id}`, {
      ...DEFAULT_HEADERS,
      method: 'PATCH',
      body: JSON.stringify({
        name: payload.name,
      }),
    });
    if (response.status !== 200) {
      yield* put(tasksActions.editTaskLocally(currentTaskData));
      yield* put(tasksActions.tasksActionFailed('Task update failed'));
    }
  } catch (error) {
    yield* put(tasksActions.editTaskLocally(currentTaskData));
    yield* put(tasksActions.tasksActionFailed('Task update failed'));
  }
}

function* doDeleteTaskSaga({ payload: id }: { type: PayloadAction['type']; payload: TaskModel['id'] }) {
  const currentTaskData = yield* select(selectTaskById, id);
  const taskIndex = yield* select(selectTaskIndex, id);

  try {
    yield* put(tasksActions.deleteTaskLocally(id));

    const response = yield* call(fetch, `${API_TASKS_URL}/${id}`, {
      method: 'DELETE',
    });

    if (response.status !== 200) {
      yield* put(
        tasksActions.revertDeleteTask({
          task: currentTaskData,
          taskIndex,
        }),
      );
      yield* put(tasksActions.tasksActionFailed('Task deletion failed'));
    }
  } catch (error) {
    yield* put(
      tasksActions.revertDeleteTask({
        task: currentTaskData,
        taskIndex,
      }),
    );
    yield* put(tasksActions.tasksActionFailed('Task deletion failed'));
  }
}

function* doCreateTaskSaga({ payload }: { type: PayloadAction['type']; payload: TaskModel }) {
  try {
    const response = yield* call(fetch, `${API_TASKS_URL}`, {
      method: 'POST',
      ...DEFAULT_HEADERS,
      body: JSON.stringify(payload),
    });
    if (response.status === 201) {
      const newTask: TaskModel = yield response.json();
      yield* put(tasksActions.createTaskLocallyAction(newTask));
    } else {
      yield* put(tasksActions.tasksActionFailed('Task creation failed'));
    }
  } catch (error) {
    yield* put(tasksActions.tasksActionFailed('Task creation failed'));
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
