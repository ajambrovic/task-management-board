import {createSelector} from '@reduxjs/toolkit';
import {type RootState} from 'redux/store';
import {type TaskModel} from './tasksModel';

// TODO: https://redux.js.org/usage/deriving-data-selectors#reselect-usage-patterns-and-limitations
export const selectTasksByTaskStatus = createSelector(
  [selectTasksData, (_, taskStatus) => taskStatus],
  (tasks, taskStatus) => Object.values(tasks).filter(task => task.status === taskStatus),
);

export const selectTaskById = (state: RootState, taskId: TaskModel['id']) => {
  return selectTasksData(state)[taskId];
};

export function selectTasksNetworkStatus(state: RootState) {
  return selectTasks(state).networkRequestStatus;
}

function selectTasksData(state: RootState) {
  return selectTasks(state).byId;
}

function selectTasks(state: RootState) {
  return state.tasks;
}
