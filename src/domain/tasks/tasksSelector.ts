import {createSelector} from '@reduxjs/toolkit';
import {type RootState} from 'redux/store';

const selectTasks = (state: RootState) => {
  return state.tasks;
};

const selectTasksData = (state: RootState) => {
  return selectTasks(state).byId;
};

// TODO: https://redux.js.org/usage/deriving-data-selectors#reselect-usage-patterns-and-limitations
export const selectTasksByTaskStatus = createSelector(
  [selectTasksData, (_, taskStatus) => taskStatus],
  (tasks, taskStatus) => Object.values(tasks).filter(task => task.status === taskStatus),
);

export const selectTasksNetworkStatus = (state: RootState) => {
  return selectTasks(state).networkRequestStatus;
};
