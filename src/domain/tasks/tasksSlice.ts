import { createAction, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { NetworkRequestStatus } from 'domain/networkRequest/networkRequestModel';
import { type TaskModel, type TasksConvertedServerModel, type TasksReduxModel, type TaskStatus } from './tasksModel';

const initialState: TasksReduxModel = {
  networkRequestStatus: NetworkRequestStatus.Success,
  ids: [],
  byId: {},
  searchQuery: '',
  error: '',
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    tasksLoadSuccess: (state, action: PayloadAction<{ data: TasksConvertedServerModel; searchQuery: string }>) => {
      state.byId = action.payload.data.byId;
      state.ids = action.payload.data.ids;
      state.networkRequestStatus = NetworkRequestStatus.Success;
      state.searchQuery = action.payload.searchQuery;
      state.error = '';
    },
    rehydrationFinished: (state) => {
      state.networkRequestStatus = NetworkRequestStatus.Success;
    },
    tasksActionFailed: (state, action: PayloadAction<string>) => {
      state.networkRequestStatus = NetworkRequestStatus.Fail;
      state.error = action.payload;
    },
    loadTasks: (state, action: PayloadAction<string>) => {
      state.networkRequestStatus = NetworkRequestStatus.InProgress;
    },
    createTaskLocallyAction: (state, action: PayloadAction<TaskModel>) => {
      state.byId[action.payload.id] = action.payload;
      state.ids.push(action.payload.id);
    },
    deleteTaskLocally: (state, action: PayloadAction<TaskModel['id']>) => {
      const index = state.ids.findIndex((id) => id === action.payload);
      const elementFound = index !== -1;
      if (elementFound) {
        state.ids.splice(index, 1);
        delete state.byId[action.payload];
      }
    },
    revertDeleteTask: (state, action: PayloadAction<{ task: TaskModel; taskIndex: number }>) => {
      state.ids.splice(action.payload.taskIndex, 0, action.payload.task.id);
      state.byId[action.payload.task.id] = action.payload.task;
    },
    editTaskLocally: (state, action: PayloadAction<TaskModel>) => {
      state.byId[action.payload.id] = action.payload;
    },
  },
});

const editTask = createAction<TaskModel>('tasks/editTask');
const deleteTask = createAction<TaskModel['id']>('tasks/deleteTask');
const createTask = createAction<TaskModel>('tasks/createTask');
const changeTaskStatus = createAction<{ taskStatus: TaskStatus; id: TaskModel['id'] }>('tasks/changeTaskStatus');

// Combining the generated actions with the manually created action
export const tasksActions = { ...tasksSlice.actions, editTask, deleteTask, createTask, changeTaskStatus };

export const { reducer: tasksReducer } = tasksSlice;
