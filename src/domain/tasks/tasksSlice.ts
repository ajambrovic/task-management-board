import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { NetworkRequestStatus } from 'domain/networkRequest/networkRequestModel';
import { produce } from 'immer';
import { type TaskModel, type TasksConvertedServerModel, type TasksReduxModel, type TaskStatus } from './tasksModel';

const initialState: TasksReduxModel = {
  networkRequestStatus: NetworkRequestStatus.Success,
  ids: [],
  byId: {},
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadTasks: (state) => {
      return { ...state, networkRequestStatus: NetworkRequestStatus.InProgress };
    },
    changeTaskStatus: (state, action: PayloadAction<{ taskStatus: TaskStatus; id: TaskModel['id'] }>) => {
      state.byId[action.payload.id].status = action.payload.taskStatus;
    },
    createTask: (state, action: PayloadAction<TaskModel>) => {
      state.byId[action.payload.id] = action.payload;
      state.ids.push(action.payload.id);
    },
    deleteTask: (state, action: PayloadAction<TaskModel['id']>) => {
      const index = state.ids.findIndex((id) => id === action.payload);
      const elementFound = index !== -1;
      if (elementFound) {
        state.ids.splice(index, 1);
        delete state.byId[action.payload];
      }
    },
    revertDeleteTask: (state, action: PayloadAction<{ task: TaskModel; taskIndex: number }>) => {
      return produce(state, (draftState) => {
        draftState.ids.splice(action.payload.taskIndex, 0, action.payload.task.id);
        draftState.byId[action.payload.taskIndex] = action.payload.task;
      });
    },
    editTask: (state, action: PayloadAction<TaskModel>) => {
      state.byId[action.payload.id] = action.payload;
    },
    tasksLoadSuccess: (state, action: PayloadAction<TasksConvertedServerModel>) => {
      return {
        ...state,
        byId: {
          ...state.byId,
          ...action.payload.byId,
        },
        ids: [...state.ids, ...action.payload.ids],
        networkRequestStatus: NetworkRequestStatus.Success,
      };
    },
    tasksLoadFailed: (state) => {
      return { ...state, networkRequestStatus: NetworkRequestStatus.Fail };
    },
  },
});

export const { actions: tasksActions, reducer: tasksReducer } = tasksSlice;
