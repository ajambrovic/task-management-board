import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from 'redux/store';
import { type TaskModel } from './tasksModel';

export const selectTaskIndex = (state: RootState, taskId: TaskModel['id']) => {
  return selectTasksIds(state).findIndex((id) => id === taskId);
};

export const selectTaskIdsByTaskStatus = createSelector(
  [selectTasksData, (_, taskStatus) => taskStatus, selectTasksIds, (_, taskIds) => taskIds],
  (tasks, taskStatus, taskIds) => {
    // Filter tasks based on taskStatus
    const filteredTasks = Object.values(tasks).filter((task) => task.status === taskStatus);

    const sortedTaskIds: TaskModel['id'][] = taskIds
      .map((taskId) => {
        const task = filteredTasks.find((t) => t.id === taskId);
        return task != null ? task.id : undefined;
      })
      .filter((taskId): taskId is TaskModel['id'] => taskId !== undefined);

    return sortedTaskIds;
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
