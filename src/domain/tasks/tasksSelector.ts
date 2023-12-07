import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from 'redux/store';
import { type TaskModel } from './tasksModel';

export const selectTaskIndex = (state: RootState, taskId: TaskModel['id']) => {
  return selectTasksIds(state).findIndex((id) => id === taskId);
};

// TODO: https://redux.js.org/usage/deriving-data-selectors#reselect-usage-patterns-and-limitations
export const selectTasksByTaskStatus = createSelector(
  [selectTasksData, (_, taskStatus) => taskStatus, selectTasksIds, (_, taskIds) => taskIds],
  (tasks, taskStatus, taskIds) => {
    // Filter tasks based on taskStatus
    const filteredTasks = Object.values(tasks).filter((task) => task.status === taskStatus);

    // Sort tasks based on the order of taskIds
    const sortedTasks: TaskModel[] = taskIds
      .map((taskId) => filteredTasks.find((task) => task.id === taskId))
      .filter((task): task is TaskModel => task !== undefined);

    return sortedTasks;
  },
);

export const selectCurrentTaskSearchQuery = (state: RootState) => {
  return selectTasks(state).searchQuery;
};

export const selectTaskLoadingError = (state: RootState) => {
  return selectTasks(state).error;
};

export const selectTaskById = (state: RootState, taskId: TaskModel['id']) => {
  return selectTasksData(state)[taskId];
};

export function selectTasksNetworkStatus(state: RootState) {
  return selectTasks(state).networkRequestStatus;
}

export function selectTasksIds(state: RootState) {
  return selectTasks(state).ids;
}

function selectTasksData(state: RootState) {
  return selectTasks(state).byId;
}

function selectTasks(state: RootState) {
  return state.tasks;
}
