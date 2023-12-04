import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {NetworkRequestStatus} from 'domain/networkRequest/networkRequestModel';
import {type TaskModel, type TasksReduxModel, type TaskStatus} from './tasksModel';

const initialState: TasksReduxModel = {
  networkRequestStatus: NetworkRequestStatus.Success,
  initialLoad: true,
  ids: [],
  byId: {},
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    changeTaskStatus: (state, action: PayloadAction<{taskStatus: TaskStatus; id: TaskModel['id']}>) => {
      state.byId[action.payload.id].status = action.payload.taskStatus;
    },
    createTask: (state, action: PayloadAction<TaskModel>) => {
      state.byId[action.payload.id] = action.payload;
      state.ids.push(action.payload.id);
    },
    deleteTask: (state, action: PayloadAction<TaskModel['id']>) => {
      const index = state.ids.findIndex(id => id === action.payload);
      const elementFound = index !== -1;
      if (elementFound) {
        state.ids.splice(index, 1);
        delete state.byId[action.payload];
      }
    },
    editTask: (state, action: PayloadAction<TaskModel>) => {
      state.byId[action.payload.id] = action.payload;
    },
  },
});

export const {actions: tasksActions, reducer: tasksReducer} = tasksSlice;
